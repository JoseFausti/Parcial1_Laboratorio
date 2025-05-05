const express = require("express");
const { getAllBooks, getBookById, postBook, putBook, deleteBook } = require("../controllers/bookController");
const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", postBook);
bookRouter.put("/:id", putBook);
bookRouter.delete("/:id", deleteBook);

module.exports = bookRouter;