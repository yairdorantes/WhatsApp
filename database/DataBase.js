import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
// const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

export const mongo = mongoose
  .connect(process.env.MONGODB_URI)

  .then(() => console.log("***Succesful mongodb connection***"))
  .catch((err) => console.error(err, "errr:("));
