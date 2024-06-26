import express from "express";
import {
  getAllBook,
  getById,
  createBook,
  updateBook,
  deleteBook,
  findBooksByUserId
} from "../contollers/book.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();


router.get("/", getAllBook);
router.get("/books", findBooksByUserId);
router.get("/:id",  getById);
router.post("/create", createBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

export default router;
