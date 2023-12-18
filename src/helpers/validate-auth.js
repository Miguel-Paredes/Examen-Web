// Metodo para proteger rutas y a la vez siendo exportada
module.exports.isAuthenticated = (req,res,next)=>{
    // Si existe un inicio de sesion
    if(req.isAuthenticated()){
        // Continuar
        return next()
    }
    // Redireccionamiento
    res.redirect('/user/login')
}
