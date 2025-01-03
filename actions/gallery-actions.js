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


