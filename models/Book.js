const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    resumen: {type: String},
    genero: {type: String, required: true},
    publicacion: {type: mongoose.Schema.Types.Date, required: true},
    disponible: {type: Boolean, required: true}
})

module.exports = mongoose.model("Book", bookSchema);