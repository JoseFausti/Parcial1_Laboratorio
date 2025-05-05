const express = require("express");
const { getAllAuthors, getAuthorById, postAuthor, putAuthor, deleteAuthor, addBookToAuthor } = require("../controllers/authorController");
const authorsRouter = express.Router();

authorsRouter.get("/", getAllAuthors);
authorsRouter.get("/:id", getAuthorById);
authorsRouter.post("/", postAuthor);
authorsRouter.put("/:id", putAuthor);
authorsRouter.delete("/:id", deleteAuthor);
authorsRouter.put("/:id/addBook/:bookId", addBookToAuthor)

module.exports = authorsRouter;