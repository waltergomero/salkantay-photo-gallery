"use server";

import  Category  from "@/models/category";
import db from "@/utils/dbconnection";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { categorySchema } from "@/schemas/validationSchemas";

const ITEM_PER_PAGE = 10;

export const fetchFilteredCategories = async (q, page) => {
 
  const regex = new RegExp(q, "i");
 
  try {
    await db.connectDB();

    const categories = await Category.find({ category_name: { $regex: regex } })
      .sort({ category_name: 1 })
 
    await db.disconnectDB();

    return categories

  } catch (err) {
    return({error: "Failed to fetch parent categories!"});
  }
};

export async function fetchCategoryPages(query) {
  noStore();
  const regex = new RegExp(query, "i");

  try {
    await db.connectDB();
    const count = await Category.find({ category_name: { $regex: regex } }).count();
    await db.disconnectDB();
    const totalpages = Math.ceil(Number(count) / ITEM_PER_PAGE);

    return totalpages;

  } catch (err) {
    return({error: "Failed to fetch categories!"});
  }
}

export async function fetchParentCategories() {
  noStore();

  try {
    await db.connectDB();
    const _parentcategory = await Category.find().select('_id category_name').sort({ category_name: 1 }).lean();
    await db.disconnectDB();
    
    const parentcategory = JSON.parse(JSON.stringify(_parentcategory));
    return parentcategory;

  } catch (err) {
    return({error: "Failed to fetch parent categories!"});
  }
}


export const fetchCategoryById = async (id) => {
  try {
    await db.connectDB();
    const _category = await Category.findById(id).select('_id category_name parent_category_id parent_category_name isactive notes');
    await db.disconnectDB();

    const category = JSON.parse(JSON.stringify(_category));
    return category;

  } catch (err) {
    return({error: "Failed to fetch category!"});
  }
};

export const fetchCategories = async () => {
  try {
    await db.connectDB();
    let _category = await Category.find().select('_id category_name').lean();
    await db.disconnectDB();
    const category = JSON.parse(JSON.stringify(_category));
    return category;
  } catch (err) {
    return({error: "Failed to fetch category!"});
  }
};

export async function createCategory(formData) {

  try {
    const category_name = formData.get("category_name");
    const parent_category_id = formData.get("parent_category_id");
    let parent_category_name = "";
    const notes = formData.get("notes");

    const validatedFields = categorySchema.safeParse({category_name,});
            
    if (!validatedFields.success) {
              return {
                error: "validation",
                zodErrors: validatedFields.error.flatten().fieldErrors,
                strapiErrors: null,
                message: "Missing information on key fields.",
              };
            }
    

    await db.connectDB();
    const categoryexists = await Category.findOne({ category_name: category_name });
    await db.disconnectDB();

    if (categoryexists) {
      return { error: "categoryexists",
        message: `Category name ${category_name} already exists.` };
    }

    if(parent_category_id != "") {
     const parentcategoryname = await Category.findOne({ _id: parent_category_id }).select('category_name');
    if (parentcategoryname) {
      parent_category_name = parentcategoryname.category_name;
    }
  }

    const newCategory = new Category({
      category_name,
      parent_category_id,
      parent_category_name,
      notes,
    });

    await newCategory.save();

  } catch (err) {
    return { error: "Failed to insert new category!" };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategory(formData) {
  try {
    const id = formData.get("id");
    const category_name = formData.get("category_name");
    const parent_category_id = formData.get("parent_category_id");
    let parent_category_name = "";
    const isactive = formData.get("isactive");
    const notes = formData.get("notes");

    const validatedFields = categorySchema.safeParse({category_name,});
            
    if (!validatedFields.success) {
              return {
                error: "validation",
                zodErrors: validatedFields.error.flatten().fieldErrors,
                strapiErrors: null,
                message: "Missing information on key fields.",
              };
            }

    await db.connectDB();
    const categoryexists = await Category.findOne({ category_name: category_name });
    await db.disconnectDB();
    
    if (categoryexists) {
      if (categoryexists._id != id) {
        return  {error: "categoryexists",
                 message: `Category name "${category_name}"  already exists`};
      }
    }

    if(parent_category_id != "") {
    const parentcategoryname = await Category.findOne({ _id: parent_category_id }).select('category_name');

    if (parentcategoryname) {
      parent_category_name = parentcategoryname.category_name;
    }
   }


    const query = {
      category_name: category_name,
      parent_category_id: parent_category_id,
      parent_category_name: parent_category_name,
      isactive: isactive,
      notes: notes,
    };
 
    await Category.updateOne({ _id: id}, query);
    }
   catch (err) {
    return { error: err };
  }

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(id) {
  try {
    await db.connectDB();
    await Category.findByIdAndDelete(id);
    await db.disconnectDB();
  } catch (err) {
    throw new Error("Failed to delete category!");
  }
  revalidatePath("/dashboard/categories");
}
