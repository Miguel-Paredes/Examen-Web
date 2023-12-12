// Importar express
const express = require('express')
// Importar path
const path = require('path') //COMMON JS

// Inicializaciones
// Instanciar express
const app = express()

// Configuraciones
// Variables de configuracion
app.set('port', process.env.port || 3000)
app.set('views',path.join(__dirname, 'views'))

// Middlewares 
// Servidor va a trabajar con informacion en base a formularios
app.use(express.urlencoded({extended:false}))
const methodOverride = require('method-override');
app.use(methodOverride('_method'))


// Variables globales

// Rutas 
// Primera ruta
app.get('/',(req,res)=>{
    res.render('index')
})

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
app.use(require('./routers/index.routes'))
app.use(require('./routers/portafolio.routes'))
module.exports = app