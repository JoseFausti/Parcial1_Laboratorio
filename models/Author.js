const { default: mongoose } = require("mongoose");

const authorSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    bio: {type: String},
    fechaNacimiento: {type: mongoose.Schema.Types.Date, required: true},
    nacionalidad: {type: String, required: true},
    libros: {type: mongoose.Schema.Types.ObjectId, ref: "Book"}
})

module.exports = mongoose.model("Author", authorSchema)