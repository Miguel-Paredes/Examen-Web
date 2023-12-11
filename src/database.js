// Importar mongoose
const mongoose = require('mongoose')

// Cadena de conexion a la base de datos
const MONGODB_URI = 'mongodb://localhost:27017/portfolio'

// Generar un metodo para hacer la cadena de conexion
connection = async()=>{
    try {
        await mongoose.Connect(MONGODB_URI)
        // Respuesta de la promesa cuando sea ok
        console.log("Database is connected")
    } catch (error) {
        // Respuesta de la promesa cuando halla un error
        console.log(error);
    }
}
// Exportar el metodo connect
module.exports = connection