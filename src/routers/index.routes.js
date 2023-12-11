// Importar routes de expres

const {Router} = require('express')

// Instanciar routes
const router = Router()

const {renderIndex,renderAbout} = require('../controllers/index.controllers.js')

router.get('/',renderIndex)
router.get('/login',renderAbout)


// Exportar la variable router
module.exports = router