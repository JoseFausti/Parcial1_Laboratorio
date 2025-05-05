const authorModel = require("../models/Author")

const getAllAuthors = async(req, res)=>{
    try {
        const authors = await authorModel.find().populate("libros");
        if(authors.length === 0){
            return res.status(404).json({messaje: "No se encontraron los autores"})
        }
        return res.status(200).json(authors)
    } catch (error) {
        return res.status(500).json({messaje: "Error al obtener los autores"})
    }
}

const getAuthorById = async(req, res)=>{
    try {
        const {id} = req.params
        const author = await authorModel.findById(id);
        if(!author){
            return res.status(404).json({messaje: "No se encontro el autor"})
        }
        return res.status(200).json(author);
    } catch (error) {
        return res.status(500).json({messaje: "Error al obtener el autor"})
    }
}

const postAuthor = async(req, res)=>{
    try {
        const {nombre, bio, fechaNacimiento, nacionalidad} = req.body
        if(nombre && fechaNacimiento && nacionalidad){
            const author = {
                nombre,
                bio: bio || "",
                fechaNacimiento,
                nacionalidad,
            }
            const newAuthor = await authorModel.create(author);
            if(!newAuthor){
                return res.status(500).json({messaje: "Error al crear el autor"})
            }
            return res.status(201).json(newAuthor)
        }else{
            throw new Error("Los campos nombre, fechaNacimiento y nacionalidad son obligatorios")
        }
    } catch (error) {
        return res.status(500).json({messaje: "Error al crear el autor: " + error})
    }
}

const putAuthor = async(req, res)=>{
    try {
        const {id} = req.params
        const {nombre, bio, fechaNacimiento, nacionalidad} = req.body
        if(nombre && fechaNacimiento && nacionalidad){
            const author = {
                nombre,
                bio: bio || "",
                fechaNacimiento,
                nacionalidad,
            }
            const updatedAuthor = await authorModel.findByIdAndUpdate({_id: id}, {updatedAuthor}, {$new: true});
            if(!updatedAuthor){
                return res.status(500).json({messaje: "Error al editar el autor"})
            }
            return res.status(200).json(updatedAuthor)
        }else{
            throw new Error("Los campos nombre, fechaNacimiento y nacionalidad son obligatorios")
        }
    } catch (error) {
        return res.status(500).json({messaje: "Error al editar el autor: " + error})
    }
}

const deleteAuthor = async(req, res)=>{
    try {
        const {id} = req.params
        const deletedAuthor = await authorModel.findByIdAndDelete({_id: id})
        if (!deletedAuthor){
            return res.status(404).json({messaje: "No se encontro el autor"})
        }
        return res.status(204);
    } catch (error) {
        return res.status(500).json({messaje: "Error al eliminar el autor: " + error})
    }
}

const addBookToAuthor = async(req, res)=>{
    try {
        const {id, bookId} = req.params
        const {titulo, resumen, genero, publicacion, disponible} = req.body

        if(titulo && genero && publicacion && disponible){
            const book = {
                _id: bookId,
                titulo,
                resumen: resumen || "",
                genero,
                publicacion,
                disponible
            }
            const updatedAuthor = await authorModel.findByIdAndUpdate({_id: id}, {$push: {libros: book}}, {new: true}).populate("libros");
            if(!updatedAuthor){
                return res.status(404).json({messaje: "No se encontro el autor"})
            }
            return res.status(200).json(updatedAuthor)
        }else{
            throw new Error("Los campos titulo, genero, publicacion y disponible son obligatorios")
        }

    } catch (error) {
        return res.status(500).json({messaje: "Error al agregar un libro a la lista del autor: " + error})
    }
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    postAuthor,
    putAuthor,
    deleteAuthor,
    addBookToAuthor
}