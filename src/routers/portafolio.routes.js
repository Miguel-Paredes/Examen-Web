// Importar el metodo
const {isAuthenticated} = require('../helpers/validate-auth')

const{Router} = require('express')

const router = Router()

const { renderAllPortafolios,
        renderPortafolio,
        renderPortafolioForm,
        createNewPortafolio,
        renderEditPortafolioForm,
        updatePortafolio,
        deletePortafolio
    } = require('../controllers/portafolio.controller.js')

// Cargar la vista de formulario
router.get('/portafolio/add', isAuthenticated,renderPortafolioForm)
// Captura los datos del formulario
router.post('/portafolio/add', isAuthenticated,createNewPortafolio)

// Presentar formulario
router.get('/portafolios', isAuthenticated,renderAllPortafolios)
// Presentar detalle formulario
router.get('/portafolio/:id', isAuthenticated,renderPortafolio)

// Cargar vista del formulario
router.get('/portafolio/edit/:id', isAuthenticated,renderEditPortafolioForm)
// Capturar y guardar datos en la base de datos
router.put('/portafolio/edit/:id', isAuthenticated,updatePortafolio)

// Eliminar el portafolio
router.delete('/portafolio/delete/:id', isAuthenticated,deletePortafolio)

module.exports = router