// Mostrar el formulario de registro
const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

// Capturar los datos del formulario y almacenar en la BDD
const registerNewUser =(req,res)=>{
    res.send('register new user')
}


// Mostrar el formulario del login
const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

// Capturar los datos del login y realizar el proceso de login en conjunto con BDD
const loginUser =(req,res)=>{
    res.send('login user')
}

// Cerrar sesion del usuario
const logoutUser =(req,res)=>{
    res.send('logout user')
}

// Exportar los metodos
module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser
}