import Book from "./models/book.models.js";
import BookJson from './books.json' with { type: "json" };;
export const seedBooksData = async()=>{
    try {
        await Book.deleteMany({});
        await Book.insertMany(BookJson);
        console.log("Books data inserted successfully");
    } catch (error) {
        console.log("error", error);
    }
}