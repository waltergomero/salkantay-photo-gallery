"use server";

import  Gallery  from "@/models/gallery";
import HomePageCategories from "@/models/homepagecategories"
import db from "@/utils/dbconnection";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import fs from "fs";

const ITEM_PER_PAGE = 10;

export const fetchImages = async () => {
 
  try {
    await db.connectDB();

    const _images = await Gallery.find() 
    await db.disconnectDB();

    const images = JSON.parse(JSON.stringify(_images));
    return images

  } catch (err) {
    return({error: "Failed to fetch gallery images!"});
  }
};

export const fetchVisibleImagesForHomePage = async () => {
 
  try {
    await db.connectDB();

    const _images = await HomePageCategories.find() 
    await db.disconnectDB();

    const images = JSON.parse(JSON.stringify(_images));
    return images

  } catch (err) {
    return({error: "Failed to fetch gallery images!"});
  }
};

export const fetchImagesByCategory = async (category_id) => {
  try {
    await db.connectDB();

    const _images = await Gallery.find({category_id: category_id}) 
    await db.disconnectDB();

    const images = JSON.parse(JSON.stringify(_images));
    return images

  } catch (err) {
    return({error: "Failed to fetch gallery images by category!"});
  }
};

export const fetchImageById = async (id) => {
  try {
    await db.connectDB();
    const _image = await Gallery.findById(id).select('_id image_name category_id category_name path');
    await db.disconnectDB();

    const image = JSON.parse(JSON.stringify(_image));
    return image;

  } catch (err) {
    return({error: "Failed to fetch image information!"});
  }
};

export async function updateImageCategory(formData) {
  console.log("formdata", formData)
  try {
    const id = formData.get("image_id");
    const category_name = formData.get("category_name");
    const category_id = formData.get("category_id");
    const path = formData.get("path");
    const image_name = formData.get("image_name");

    await db.connectDB();
    const query = {
      category_name: category_name,
      category_id: category_id,
    };

    await Gallery.updateOne({ _id: id}, query);

    const imageExist = await HomePageCategories.findOne({ image_name: image_name });
    const categoryExist = await HomePageCategories.findOne({ category_name_name: category_name });

    //delete the image from the homepagecategories collection if image and category exists
    if(imageExist && categoryExist){  
        await HomePageCategories.findByIdAndDelete(imageExist._id);  
     }
    else if(imageExist && !categoryExist){ //update the image name and path in the homepagecategories collection
      await HomePageCategories.updateOne({ _id: imageExist._id}, query);
     }
    else{
        if(!imageExist && !categoryExist){ //if category do not exists, then add the category to the homepagecategories collection
          const newItem = new HomePageCategories({
            category_id,
            category_name,
            image_name,
            path
          });
          await newItem.save();
          }
      } 
      await db.disconnectDB();
    }catch (err) {}
      revalidatePath("/admin/gallery");
    }


export async function deleteImageFromGallery(image_id, image_path) {
  console.log("id and image path to delete", image_id, image_path)
  try {
    await db.connectDB();
    await HomePageCategories.deleteOne({path: image_path});
    const response = await Gallery.findByIdAndDelete(image_id);
    await db.disconnectDB();
    if(response){
      fs.unlink("public" + image_path,function(err){
        if(err) throw err;
        console.log('File deleted!');
      });
  }
    
  } catch (err) {
    throw new Error(err) //"Failed to delete product!");
  }
  revalidatePath("/admin/gallery");
}

export async function MakeImageVisible(image_id) {
  try {
      const query = {
        make_visible: true,
    };    
    await db.connectDB();
    await Gallery.updateOne({ _id: image_id}, query);

    const imageInfo = await Gallery.findOne({ _id: image_id });
    const categoryExist = await HomePageCategories.findOne({ category_name: imageInfo.category_name });
    
    if(categoryExist){ //if category exists, then update the fields image name and image path
      const updatequery = {
        image_name: imageInfo.image_name,
        path: imageInfo.path
        }
        await HomePageCategories.updateOne({ category_id: imageInfo.category_id}, updatequery);
      }
      else{
        const newItem = new HomePageCategories({
          category_id: imageInfo.category_id,
          category_name: imageInfo.category_name,
          image_name: imageInfo.image_name,
          path: imageInfo.path
        });
    
        await newItem.save();
      }
    await db.disconnectDB();
    
  } catch (err) {
    throw new Error(err);
  }
  revalidatePath("/admin/gallery");
}

export async function MakeImageNotVisible(image_id, image_path) {
  console.log("item to delete", image_id, image_path)
  try {
    const query = {
      make_visible: false,
  };    
    await db.connectDB();
    await Gallery.updateOne({ _id: image_id}, query);
    await db.disconnectDB();
    
  } catch (err) {
    throw new Error(err);
  }
  revalidatePath("/admin/gallery");
}


