import express from "express";
import {
  getAllBook,
  getById,
  createBook,
  updateBook,
  deleteBook,
} from "../contollers/book.controller.js";
const router = express.Router();

router.get("/",    getAllBook);
router.get("/:id",  getById);
router.post("/create", createBook);
router.put("/update/:id", updateBook);
router.delete("/delete", deleteBook);

export default router;
