// Importar passport
const passport = require('passport')
// Importar el modelo User
const User = require('../models/User')
// Importar node-notifier
const notifier = require('node-notifier');
// Establecer la estrategia
const LocalStrategy = require('passport-local').Strategy

// Implementar la estrategia local
passport.use(new LocalStrategy({
    // en base a email y passowrd
    usernameField:'email',
    passwordField:'password'
    // Funcion para hacer el proceso de inicio de sesion
},async(email,password,done)=>{
    // buscar el usuario en base al email
    const userBDD = await User.findOne({email})
    // Verificar si existe el usuario
    if(!userBDD) return done(showAlert(errorMessage),false,)
    // Desincriptar el passowrd
    const passwordUser = await userBDD.matchPassword(password)
    if(!passwordUser) return done(showAlert(errorMessage2),false)
    // Validar si el usuairo puede iniciar sesion si y solo si ha confirmado su cuenta de correo electronico
    if(userBDD.confirmEmail===false) return done(showAlert(errorMessage3),false)
    // Retornar el usuario de BDD
    return done(null,userBDD)
}))



function showAlert(message) {
  notifier.notify({
    title: '¡Lo sentimos!',
    message: message,
    sound: true
  });
}

const errorMessage = 'El email no se encuentra registrado.';
const errorMessage2 = 'Los passwords no coinciden.';
const errorMessage3 = 'Debe verificar la cuenta en su correo electrónico.';

passport.serializeUser((user,done)=>{
    done(null,user.id)
})


passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});