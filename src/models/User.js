// Importar Schema
const {Schema, model} = require('mongoose')

// Importar bcrypt
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password :{
        type:String,
        require:true
    },
    token:{
        type:String,
        default:null
    },
confirmEmail:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

// Método para cifrar el password del usuario
userSchema.methods.encrypPassword = async (password)=>{
    // Establecer los saltos para encriptar el password
    const salt = await bcrypt.genSalt(10)
    // encriptar el password
    const passwordEncryp = await bcrypt.hash(password,salt)
    // retornar el password encriptado
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
userSchema.methods.matchPassword = async function(password){
    // Utilizar el metodo compare
    const response = await bcrypt.compare(password,this.password)
    // Retornar el booleano     
    return response
}

// Método para crear un token 
userSchema.methods.crearToken = function(){
    return token = this.token = Math.random().toString(36).slice(2)
}


module.exports = model('user',userSchema)