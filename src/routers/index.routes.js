// Importar routes de expres

const {Router} = require('express')

// Instanciar routes
const router = Router()

router.get('/',(req,res)=>{
    res.render('index')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

// Exportar la variable router
module.exports = router