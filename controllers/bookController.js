const bookModel = require("../models/Book");
const authorModel = require("../models/Author")

const getAllBooks = async(req, res)=>{
    try {
        const books = await bookModel.find();
        if(books.length === 0){
            return res.status(404).json({messaje: "No se encontraron los libros"})
        }
        return res.status(200).json(books)
    } catch (error) {
        return res.status(500).json({messaje: "Error al obtener los libros"})
    }
}

const getBookById = async(req, res)=>{
    try {
        const {id} = req.params
        const book = await bookModel.findById(id);
        if(!book){
            return res.status(404).json({messaje: "No se encontro el libro"})
        }
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({messaje: "Error al obtener el libro"})
    }
}

const postBook = async(req, res)=>{
    try {
        const {titulo, resumen, genero, publicacion, disponible} = req.body
        if(titulo && genero && publicacion && disponible){
            const book = {
                titulo,
                resumen: resumen || "",
                genero,
                publicacion,
                disponible
            }
            const newBook = await bookModel.create(book);
            if(!newBook){
                return res.status(500).json({messaje: "Error al crear el libro"})
            }
            return res.status(201).json(newBook)
        }else{
            throw new Error("Los campos titulo, genero, publicacion y disponible son obligatorios")
        }
    } catch (error) {
        return res.status(500).json({messaje: "Error al crear el libro: " + error})
    }
}

const putBook = async(req, res)=>{
    try {
        const {id} = req.params
        const {titulo, resumen, genero, publicacion, disponible} = req.body
        if(titulo && genero && publicacion && disponible){
            const book = {
                titulo,
                resumen: resumen || "",
                genero,
                publicacion,
                disponible
            }
            const updatedBook = await bookModel.findByIdAndUpdate({_id: id}, {book}, {$new: true});
            if(!updatedBook){
                return res.status(500).json({messaje: "Error al editar el libro"})
            }
            return res.status(200).json(updatedBook);
        }else{
            throw new Error("Los campos titulo, genero, publicacion y disponible son obligatorios")
        }
    } catch (error) {
        return res.status(500).json({messaje: "Error al editar el libro: " + error})
    }
}

const deleteBook = async(req, res)=>{
    try {
        const {id} = req.params
        const authorBook = authors.find((author)=> author.libros?._id === id);
        if (authorBook){
            return res.status(401).json({messaje: "No se puede eliminar un libro asignado a un autor"})
        }
        const deletedBook = await bookModel.findByIdAndDelete({_id: id})
        if (!deletedBook){
            return res.status(404).json({messaje: "No se encontro el libro"})
        }
        const authors = await authorModel.find().populate("libros")
        return res.status(204);
    } catch (error) {
        return res.status(500).json({messaje: "Error al eliminar el libro: " + error})
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    postBook,
    putBook,
    deleteBook
}