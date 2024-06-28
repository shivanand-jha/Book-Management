import mongoose from "mongoose";
import Book from "../models/book.models.js";
import User from "../models/user.models.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
const { ObjectId } = mongoose.Types;


// export const getAllBook = async (req, res, next) => {
//     try {
//         const books = await Book.find().sort({_id:-1});
//         if(books)
//             return next(CreateSuccess(200,"Got Book Successfully", books));
//         else
//             return next(CreateError(404, "Books Not Found"));
//     }catch(err){
//         console.log(err);
//         next(CreateError(500, "Internal Servere Error"));
//     }
// };



export const getAllBook = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number, default to 1
    const pageSize = parseInt(req.query.pageSize) || 12; // Number of items per page, default to 5

    // Calculate skip and limit values for pagination
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    // Query books with pagination
    const books = await Book.find()
      .sort({ _id: -1 }) // Sort by _id descending (or any other field)
      .skip(skip) // Skip records
      .limit(limit); // Limit number of records


    const totalCount = await Book.countDocuments({});

    if (books.length > 0) {
      // Return success response with paginated books
      res.status(200).json({
        totalCount,
        page,
        items: books
      });
    } else {
      // Return error if no books found
      next(CreateError(404, "Books Not Found"));
    }
  } catch (err) {
    console.error(err);
    next(CreateError(500, "Internal Server Error"));
  }
};



export const getById = async (req, res, next) => {
    try{
        const book = await Book.findById(req.params.id);
        if(book){
            return next(CreateSuccess(200,"Got Book Successfully", book));
        }else{
            return next(CreateError(404, "Book Not Found"));
        }
    }
    catch(err){
        console.log(err);
        return next(CreateError(500,"Internal Server Error"));
    }
};


export const createBook = async (req, res, next) => {
  try {
    const newBook = new Book(req.body);
    newBook.User = User._id;
    const savedBook = await newBook.save();

    res.status(200).json(CreateSuccess(savedBook));
  } catch (error) {
    console.error(error)
    next(error);
  }
};




export const updateBook = async (req, res, next) => {
  try {
    const updateBook = await Book.findById({ _id: req.params.id });
    if (updateBook) {
      const savedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      next(CreateSuccess(200, "Books Updated Successfully"));
    } else {
      return next(CreateError(404, "Book Not Found"));
    }
  } catch (err) {
    console.log(err);
    return next(CreateError(500, "Internal Server Error"));
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const deleteBook = await Book.findById({_id:req.params.id});
    if(deleteBook){
      await Book.findByIdAndDelete(req.params.id);
      next(CreateSuccess(200,"Book Deleted Successfully"));
    }else{
      return next(CreateError(404,"Book Not Found"));
    }
  } catch (error) {
    console.log(error);
    next(CreateError(500),'Internal Server Error');
  }
};


// Function to find books by user ID
export const findBooksByUserId = async (req, res, next) => {
    // const { userId } = req.params; 
    try {
        const books = await Book.find({ user: req.params.id })

        if(books){
          return next(CreateSuccess(200,"Got Book Successfully", books));
      }else{
          return next(CreateError(404, "Book Not Found"));
      }
    } catch (error) {
        console.error('Error finding books:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
