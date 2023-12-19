const Portfolio = require('../models/Portfolio.js')



// Metodo para listar portafolios
const renderAllPortafolios = async(req,res)=>{
    const portfolios = await Portfolio.find().lean()
    res.render("portafolio/allPortfolios",{portfolios})
    // Formato json
    // res.json({portfolios})
}

// Metodo para listar el detalle de un portafolio
const renderPortafolio = (req,res)=>{
    res.send('Mostrar el detalle de un portafolio')
}

// Metodo para listar el formulario
const renderPortafolioForm = (req,res)=>{
    res.render('portafolio/newFormPortafolio')
}

// Metodo para guardar una base de datos
const createNewPortafolio =async (req,res)=>{
    const {title, category,description} = req.body
    const newPortfolio = new Portfolio({title,category,description})
    // Asociar el portafolio con el usuario
    newPortfolio.user = req.user._id
    await newPortfolio.save()
    res.redirect('/portafolios')
}

// Metodo para actualizar el formulario
const renderEditPortafolioForm =async(req,res)=>{
    // Consulta del portafolio en base de datos con el id
    const portafolios = await Portfolio.find({user:req.user._id}).lean()
    // Mandar a la vista
    res.render('portafolio/editPortfolio',{portfolio})
}

// Metodo para actualizar en la base de datos los datos del formulario
const updatePortafolio = async(req,res)=>{
    // Capturar datos del body
    const {title,category,description}= req.body
    // Actualizar el portafolio en BD
    await Portfolio.findByIdAndUpdate(req.params.id,{title,category,description})
    res.redirect('/portafolios')
}

// Metodo eliminar 
const deletePortafolio = async(req,res)=>{
    await Portfolio.findByIdAndDelete(req.params.id)
    res.redirect('/portafolios')
}

// Commonjs nombrada
module.exports ={
    renderAllPortafolios,
    renderPortafolio,
    renderPortafolioForm,
    createNewPortafolio,
    renderEditPortafolioForm,
    updatePortafolio,
    deletePortafolio
}