import mongoose from "mongoose";
// import User from "./user.models.js";
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    // unique: true
  },
  author: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    // min: 1000,
    // max: 9999
  },
  pages: {
    type: Number,
    required: true,
    // min: 1
  },link:{
    type:String,
    required:true
  },
  user:{
    type:[mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  }
}
,{timestamps:true});


export default mongoose.model("Book",bookSchema);