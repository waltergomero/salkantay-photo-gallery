import { NextResponse } from "next/server";
import db from "@/utils/dbconnection";
import Gallery from "@/models/gallery";
import fs from "node:fs/promises";


export async function POST(req) {
  try {
    const formData = await req.formData();
    console.log("form data: ", formData)

    const file = formData.get("image");
    const ext = formData.get("extension");
    const category_id = formData.get("category_id");
    const category_name = formData.get("category_name");

    var date = new Date();
    const unixTimestamp = Math.floor(date.getTime());
    const newName = unixTimestamp + "." + ext;

    var blob = file.slice(0, file.size); 
    var newFileName = new File([blob], newName, { type: file.type });
    console.log("new file name: ", newFileName)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const imageName = newFileName.name;

    var sizeOf = require("image-size");
    var dimensions = sizeOf(buffer);
 
    var format = "Landscape";
     if (dimensions.height > dimensions.width) format = "Portrait";

    const partialPath = `/images/gallery/${imageName}`;
    const path = `./public/${partialPath}`
    await fs.writeFile(path, buffer);
    
    const addImageToGallery = new Gallery({
      category_id: category_id,
      category_name: category_name,
      image_name: imageName,
      path: partialPath,
      format: format,
    });
    db.connectDB();
    console.log("data to save: ", addImageToGallery)
    const data = await addImageToGallery.save();
    db.disconnectDB();

    return NextResponse.json({ status: "success" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}