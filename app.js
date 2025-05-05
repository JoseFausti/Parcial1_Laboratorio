const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./routes/books");
const authorsRouter = require("./routes/authors");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, {dbName: "Libros"}).then(()=>{
    console.log("Conexion establecida")
})
.catch(()=>{
    console.log("Error en la conexion")
})

app.use("/books", bookRouter);
app.use("/authors", authorsRouter);


app.listen(3000, ()=>{
    console.log("Servidor corriendo en el puerto 3000")
})

