import { NextResponse } from "next/server";
import db from "@/utils/dbconnection";
import Images from "@/models/image";
import fs from "node:fs/promises";


export async function POST(req) {
  try {
    const formData = await req.formData();
    console.log("form data: ", formData)

    const file = formData.get("image");
    const ext = formData.get("extension");
    const product_id = formData.get("productid");
    const order = formData.get("order");

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

    const partialPath = `/images/product/${imageName}`;
    const path = `./public/${partialPath}`
    await fs.writeFile(path, buffer);
    
    const addImage = new Images({
      image_name: imageName,
      product_id: product_id,
      path: partialPath,
      format: format,
      order: order,
    });
    db.connect();
    const data = await addImage.save();
    db.disconnect();

    return NextResponse.json({ status: "success" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}