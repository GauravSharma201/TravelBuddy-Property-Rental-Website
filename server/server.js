import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import router from "./route/route.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./config/config.env" });
}

const __dirname = dirname(fileURLToPath(import.meta.url)); //as we are using es6 module, __dirname is not defined
const app = express();
// app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.json())
app.use(cookieParser());
app.use(fileUpload());
app.use(router);
app.use(express.static(path.join(__dirname, "../client/travel-app/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../client/travel-app/build/index.html")
  );
});

const connct_url = process.env.CONNECTION_URL;
const port = process.env.PORT;
const start = async () => {
  try {
    await mongoose.connect(connct_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected to the DB...");
  } catch (error) {
    console.log(error);
  }
};
start();
app.listen(port, () => console.log(`server is listening to port: ${port}`));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
