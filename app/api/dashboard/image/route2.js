import { IncomingForm } from "formidable";
import db from "@/utils/dbconnection";
import Images from "@/models/image";


var mv = require("mv");

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const asynParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

//export default async function handler(req, res) {
  export async function POST(req, res) {
  if (req.method === "POST") {
    const result = await asynParse(req);
    var _path = create_folder();
    console.log("result file: ", result.files, result.fields)
    const product_id = result.fields.product_id;
   // const preImageName = result.files.image.originalFilename;
    const ext = "." + result.fields.extension;
    const order = "." + result.fields.order;

    var date = new Date();
    const unixTimestamp = Math.floor(date.getTime());

    const imageName = unixTimestamp + ext;

    const oldPath = result.files.image.filepath;
    const imagePath = _path + "/" + imageName;

    mv(oldPath, imagePath, function (err) {});

    const updatedPath = removeFirstWord(imagePath);

    var sizeOf = require("image-size");
    var dimensions = sizeOf(oldPath);
    var format = "Landscape";
     if (dimensions.height > dimensions.width) format = "Portrait";

    const addImage = new Images({
      image_name: imageName,
      product_id: product_id,
      path: updatedPath,
      format: format,
      order: order,
    });
    db.connect();
    const data = await addImage.save();
    db.disconnect();
    return res.status(200).json(data);
  }
}

function create_folder() {
  const fs = require("fs");
  const dir = "public/gallery/";
  !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function removeFirstWord(str) {
  const indexOfSpace = str.indexOf("/");

  if (indexOfSpace === -1) {
    return "";
  }

  return str.substring(indexOfSpace + 1);
}
