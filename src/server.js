// Importaciones
// Importar express
const express = require('express')
// Importar path
const path = require('path') //COMMON JS
// Importacion de passport
const passport = require('passport');
// Importacion de session
const session = require('express-session');
// Importacion de fileUpload
const fileUpload = require('express-fileupload')



// Inicializaciones
// Instanciar express
const app = express()
// Inicializar el archivo de configuracion
require('./config/passport')




// Configuraciones
// Variables de configuracion
app.set('port', process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))
// Establecer la carpeta temporal y el directorio
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));


// Middlewares 
// Servidor va a trabajar con informacion en base a formularios
app.use(express.urlencoded({extended:false}))
const methodOverride = require('method-override');
app.use(methodOverride('_method'))

// Configurar la sesion del usuario
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));
// Inicializar password.js
app.use(passport.initialize())
app.use(passport.session())







// Variables globales
// Rutas 
// Primera ruta
app.use((req,res,next)=>{
    res.locals.user = req.user?.name || null
    next()
})
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
app.use(require('./routers/user.routes'))





// Archivos estáticos
// Definir archivos estaticos y publicos
app.use(express.static(path.join(__dirname,'public')))

const { engine }  = require('express-handlebars')


// Configuraciones 
// Establecer el path de la carpeta views
app.set('views',path.join(__dirname, 'views'))
// Establecer las configuraciones
app.engine('.hbs',engine({
    // Establecer el master page
    defaultLayout:'main',
    // Establecer el path de la carpeta layouts
    layoutsDir: path.join(app.get('views'),'layouts'),
    // Establecer el path de la carpeta partials
    partialsDir: path.join(app.get('views'),'partials'),
    // Establecer la extension de las paginas
    extname:'.hbs'
}))
// Establecer el metodo de plantillas
app.set('view engine','.hbs')
app.use(express.static(path.join(__dirname,'public')))

module.exports = app