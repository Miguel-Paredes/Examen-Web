// Importar routes de expres

const {Router} = require('express')

// Instanciar routes
const router = Router()

const {renderIndex} = require('../controllers/index.controllers.js')

router.get('/',renderIndex)


// Exportar la variable router
module.exports = router