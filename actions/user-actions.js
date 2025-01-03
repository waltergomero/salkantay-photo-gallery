"use server";

import  User  from "@/models/user";
import bcryptjs from "bcryptjs";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { unstable_noStore as noStore } from 'next/cache';
import db from "@/utils/dbconnection";
import { userRegistrationSchema, userSigninSchema, userUpdateSchema } from "@/schemas/validationSchemas";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const ITEM_PER_PAGE = 10;

export const fetchFilteredUsers = async (q, page) => {
 
  const regex = new RegExp(q, "i");
 
  try {
    await db.connectDB();

    const users = await User.find({ email: { $regex: regex } })
      .sort({ last_name: 1, first_name: 1 })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return users
    await db.disconnectDB();

  } catch (err) {
    return({error: "Failed to fetch users!"});
  }
};

export async function fetchUserPages(query) {
  noStore();
  const regex = new RegExp(query, "i");
  try {
    await db.connectDB();
    const matchingElements  = await User.find({ email: { $regex: regex } }) //.count();
    const count = matchingElements.length
    await db.disconnectDB();

    const totalPages = Math.ceil(Number(count) / ITEM_PER_PAGE);
    return totalPages;

  } catch (err) {
    return({error: "Failed to fetch users!"});
  }
}


export const fetchUserById = async (id) => {
  try {
    await db.connectDB();
    const _user = await User.findById(id);
    await db.disconnectDB();

    const user = JSON.parse(JSON.stringify(_user));
    return user
  } catch (err) {
    return({error: err + "Failed to fetch user!"});
  }
};

export async function createUser( formData, register=false) {
  const redirectPath = register ? "/auth/login" : "/admin/users";

  try {
    const _isAdmin = formData.get("isadmin");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const name = formData.get("first_name") + ' ' + formData.get("last_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const isadmin = _isAdmin ? true : false;
    const provider = "credentials";
    const type = "credentials";

    const validatedFields = userRegistrationSchema.safeParse({
      first_name,
      last_name,
      email,
      password
    });

    console.log("validatedFields", validatedFields);

    if (!validatedFields.success) {
      return {
        error: "validation",
        zodErrors: validatedFields.error.flatten().fieldErrors,
        strapiErrors: null,
        message: "Missing information on key fields.",
      };
    }
  
    else{
    await db.connectDB();
    const userexists = await User.findOne({ email: email });

    if (userexists) {
      return { 
        error: "userexists",
        message: `User with this email account ${email} already exists.`, 
        }
      }
      
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      first_name,
      last_name,
      name,
      email,
      password: hashedPassword,
      isadmin,
      provider,
      type,
    });

    await newUser.save();
    await db.disconnectDB();
  }

  } catch (err) {
    return { error: "Failed to insert new user!" + err};
  }

  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function updateUser(formData) {

  try {
    const id = formData.get("id");
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const name = formData.get("first_name") + ' ' + formData.get("last_name");
    const email = formData.get("email");
    const password = formData.get("password");
    const isadmin = formData.get("isadmin");
    const isactive = formData.get("isactive");

    const validatedFields = userUpdateSchema.safeParse({
      first_name,
      last_name,
      email,
    });

    console.log("validatedFields", validatedFields);

    if (!validatedFields.success) {
      return {
        error: "validation",
        zodErrors: validatedFields.error.flatten().fieldErrors,
        strapiErrors: null,
        message: "Missing information on key fields.",
      };
    }

    await db.connectDB();
    const userexists = await User.findOne({ email: email });

    if (userexists) {
      if (userexists._id != id) {
        return  {error: "userexists",
                 message: `User with this email "${email}" already exists`};
      }
    }

    let query = "";

    if(password){
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt); 

       query = {
          first_name: first_name,
          last_name: last_name,
          name: name,
          email: email,
          password: hashedPassword,
          isadmin: isadmin,
          isactive: isactive,
        };
     }
     else{
       
       query = {
        first_name: first_name,
        last_name: last_name,
        name: name,
        email: email,
        isadmin: isadmin,
        isactive: isactive,
        };
     }
      await User.updateOne({ _id: id}, query);
      await db.disconnectDB();
  
  } catch (err) {
    return { error: err };
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUser(id) {
  try {
    await db.connectDB();
    await User.findByIdAndDelete(id);
    await db.disconnectDB();
    
  } catch (err) {
    throw new Error("Failed to delete user!");
  }
  revalidatePath("/dashboard/users");
}

export async function fetchUserByEmail(email) {
  try {
    await db.connectDB();
    return await User.findOne({email: email});
    await db.disconnectDB();
    //return user;
  } catch (error) {

    throw new Error('Failed to fetch user.');
  }
}

export async function doCredentialLogin(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const validatedFields = userSigninSchema.safeParse({email, password});

    console.log("validatedFields", validatedFields);

    if (!validatedFields.success) {
      return {
        error: "Missing information on key fields.",
        zodErrors: validatedFields.error.flatten().fieldErrors,
        strapiErrors: null,
      };
    }

    await signIn("credentials", {email, password, redirect: false,});
    return { success: true };
  } 
  catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: "error 500" };
  }
 
}

export async function doSocialLogin(provider) {
  
 await signIn(provider, { redirectTo: "/admin" });

  // try {
  //   await signIn(provider);
    
  // } 
  // catch (error) {
  //   if (error instanceof AuthError) {
  //     return { error: error.cause?.err?.message };
  //   }
  //   return { error: `error 500 ${error}` };
  // }
  // redirect("/admin");
}