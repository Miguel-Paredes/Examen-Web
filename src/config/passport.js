// Importar passport
const passport = require('passport')
// Importar el modelo User
const User = require('../models/User')
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
    if(!userBDD) return done("Lo sentimos, el email no se encuentra registrado",false,)
    // Desincriptar el passowrd
    const passwordUser = await userBDD.matchPassword(password)
    if(!passwordUser) return done("Lo sentimos, los passwords no coinciden",false)
    // Validar si el usuairo puede iniciar sesion si y solo si ha confirmado su cuenta de correo electronico
    if(userBDD.confirmEmail===false) return done("Lo sentimos, debe verificar la cuenta en su correo electrónico",false)
    // Retornar el usuario de BDD
    return done(null,userBDD)
}))



passport.serializeUser((user,done)=>{
    done(null,user.id)
})


passport.deserializeUser(async (id, done) => {
    const userDB  = await User.findById(id).exec();
    return done(null,userDB)
});