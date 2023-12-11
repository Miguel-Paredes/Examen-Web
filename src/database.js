
// Importar mongoose
const mongoose = require('mongoose')

// Generar un metodo para hacer la cadena de conexion
connection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        // Respuesta de la promesa cuando sea ok
        console.log("Database is connected")
    } catch (error) {
        // Respuesta de la promesa cuando halla un error
        console.log(error);
    }
}
// Exportar el metodo connect
module.exports = connection