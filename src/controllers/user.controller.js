// Importacion del modelo
const User = require('../models/User')

// Importacion de passport
const passport = require("passport")

// Importar node-notifier
const notifier = require('node-notifier');

// Importacion de passport
const { sendMailToUser } = require("../config/nodemailer")


// Mostrar el formulario de registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}


function showAlert(message, res) {
    let title = '¡Lo sentimos!';
    if (message === errorMessage5) {
        title = 'Felicidades';
    }
  
    notifier.notify({
        title: title,
        message: message,
        sound: true
    }, function (err, response) {
        if (!err) {
            res.redirect('back');
        }
    });
}

const errorMessage = 'Debes llenar todos los campos.';
const errorMessage2 = 'Los passwords no coinciden.';
const errorMessage3 = 'El email ya se encuentra registrado.';
const errorMessage4 = 'No se puede validar la cuenta.';
const errorMessage5 = 'Token confirmado, ya puedes iniciar sesión.';

// Capturar los datos del formulario y almacenar en la BDD
const registerNewUser = async(req,res)=>{
    // Capturar los datos del body
    const{name,email,password,confirmpassword} = req.body
    // Validar todos los campos
    if (Object.values(req.body).includes("")) return showAlert(errorMessage, res) 
    // Validar el password
    if(password != confirmpassword) return showAlert(errorMessage2, res)
    // Validar si el usuario ya esta registrado
    const userBDD = await User.findOne({email})
    // Si el usuario ya esta registrado 
    if(userBDD) return showAlert(errorMessage3,res)
    // Crear una instancia del usuario
    const newUser = await new User({name,email,password,confirmpassword})
    // Encriptar el password
    newUser.password = await newUser.encrypPassword(password)
    // Establecer el token
    const token = newUser.crearToken()
    // Enviar el correo electronico
    sendMailToUser(email,token)
    // Guardar en BDD
    newUser.save()
    // Redirecionamiento
    res.redirect('/user/login')
}

// Metodo para confirmar el Email
const confirmEmail = async(req,res)=>{
    // Validar si existe el token
    if(!(req.params.token)) return showAlert(errorMessage4, res)
    // Obtener el usuario en base al token
    const userBDD = await User.findOne({token:req.params.token})
    userBDD.token = null
    userBDD.confirmEmail=true
    await userBDD.save()
    showAlert(errorMessage5, res)
}


// Mostrar el formulario del login
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

// Capturar los datos del login y realizar el proceso de login en conjunto con BDD
const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})

// Cerrar sesion del usuario
const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}

// Exportar los metodos
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail
}