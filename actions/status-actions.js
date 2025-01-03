"use server";

import  Status  from "@/models/status";
import db from "@/utils/dbconnection";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { statusSchema } from "@/schemas/validationSchemas";

const ITEM_PER_PAGE = 10;

export const fetchFilteredStatus = async (q, page) => {
 
  const regex = new RegExp(q, "i");
 
  try {
    await db.connectDB();

    const status = await Status.find({ status_name: { $regex: regex } })
      .sort({ status_type_id: 1, status_name: 1 })
      //.limit(ITEM_PER_PAGE)
      //.skip(ITEM_PER_PAGE * (page - 1));
    await db.disconnectDB();

    return status

  } catch (err) {
    return({error: "Failed to fetch status!"});
  }
};

export async function fetchStatusPages(query) {
  noStore();
  const regex = new RegExp(query, "i");
  try {
    await db.connectDB();
    const matchingElements  = await Status.find({ status_name: { $regex: regex } });
    const count = matchingElements.length
    await db.disconnectDB();

    const totalPages = Math.ceil(Number(count) / ITEM_PER_PAGE);
    return totalPages;

  } catch (err) {
    return({error: "Failed to fetch users!"});
  }
}

export async function fetchStatusTypeId() {
  noStore();

  try {
      var arr = [];
      for (let i = 0; i <= 10; i++) {
        arr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }

      return arr;

  } catch (err) {
    return({error: "Failed to fetch status type id!"});
  }
}



export const fetchStatusById = async (id) => {
  try {
    await db.connectDB();
    const _status = await Status.findById(id);
    await db.disconnectDB();

    const status = JSON.parse(JSON.stringify(_status));
    return status;
  } catch (err) {
    return({error: "Failed to fetch status!"});
  }
};

export async function createStatus(formData) {

  try {
    const status_name = formData.get("status_name");
    const status_type_id = formData.get("status_type_id");

    const validatedFields = statusSchema.safeParse({status_name,});
    
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
    const statusexists = await Status.findOne({ status_name: status_name, status_type_id: status_type_id });

    if (statusexists) {
      return {  error: "statusexists",
        message: `Status name ${status_name} with type id ${status_type_id}  already exists.` };
    }

    const newStatus = new Status({
      status_name,
      status_type_id,
    });

    await newStatus.save();
    await db.disconnectDB();
    
  } catch (err) {
    return { error: "Failed to insert new status!" };
  }

  revalidatePath("/admin/status");
  redirect("/admin/status");
}

export async function updateStatus(formData) {
 
  try {
    const id = formData.get("id");
    const status_name = formData.get("status_name");
    const status_type_id = formData.get("status_type_id");
    const isactive = formData.get("isactive");

    const validatedFields = statusSchema.safeParse({status_name,});
    
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
    const statusexists = await Status.findOne({ status_name: status_name, status_type_id: status_type_id });

    if (statusexists) {
      if (statusexists._id != id) {
        return  {error: "statusexists",
                 error: `Status name "${status_name}" with type id "${status_type_id}" already exists`};
      }
    }

    const query = {
      status_name: status_name,
      status_type_id: status_type_id,
      isActive: isactive
    };
    
    await Status.updateOne({ _id: id}, query);
    await db.disconnectDB();
    }
   catch (err) {
    return { error: err };
  }

  revalidatePath("/admin/status");
  redirect("/admin/status");
}

export async function deleteStatus(id) {
  try {
    await db.connectDB();
    await Status.findByIdAndDelete(id);
    await db.disconnectDB();
  } catch (err) {
    throw new Error("Failed to delete status!");
  }
  revalidatePath("/dashboard/status");
}
