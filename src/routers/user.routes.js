const { redirectIfAuthenticated } = require('../helpers/validate-auth')
const {Router} = require('express')
const { renderRegisterForm, registerNewUser, renderLoginForm, loginUser, logoutUser, confirmEmail } = require('../controllers/user.controller')
const router = Router()


// Ruta para mostrar el formulario de registro
router.get('/user/register',renderRegisterForm)
// Ruta para capturar los datos del formulario y almacenar en la BDD
router.post('/user/register',registerNewUser)


// Ruta mostrar el formulario del login
router.get('/user/login', redirectIfAuthenticated, renderLoginForm)
// Ruta para capturar los datos del login y realizar el proceso de login en conjunto con BDD
router.post('/user/login',loginUser)


// Ruta para cerrar sesion del usuario
router.post('/user/logout',logoutUser)

// Ruta para confirmar la cuenta del usuario 
router.get('/user/confirmar/:token',confirmEmail)

module.exports =router