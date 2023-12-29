// Importar el modelo
const Portfolio = require('../models/Portfolio')

// Metodo para listar todos los portafolios
const renderIndex = async(req,res)=>{
    // Consultar todos los portafolios, transformar a JSON y almacenarlos en la variable portfolios
    const portfolios = await Portfolio.find().lean()
    // Invocar a la vista index y pasar la variable portfolios
    res.render('index',{portfolios})
}


// Exportar de la funcion
module.exports ={
    renderIndex, 
}