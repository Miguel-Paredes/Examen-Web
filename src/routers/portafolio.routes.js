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
router.get('/portafolio/add', renderPortafolioForm)
// Captura los datos del formulario
router.post('/portafolio/add', createNewPortafolio)

// Presentar formulario
router.get('/portafolios', renderAllPortafolios)
// Presentar detalle formulario
router.get('/portafolio/:id', renderPortafolio)

// Cargar vista del formulario
router.get('/portafolio/edit/:id', renderEditPortafolioForm)
// Capturar y guardar datos en la base de datos
router.put('/portafolio/edit/:id', updatePortafolio)

// Eliminar el portafolio
router.delete('/portafolio/delete/:id', deletePortafolio)

module.exports = router