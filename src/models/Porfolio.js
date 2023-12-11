// Importar el esquema y el modelo
const {Schema, model} = require('mongoose')

// Crear un nuevo esquema -- portafolioSchema
const portfolioSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category :{
        type:String,
        require:true
    }
},{
    timestamps:true
})

// Exportar el modelo
module.exports = model('portfolio',portfolioSchema)