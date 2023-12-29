// Importar nodemailer
const nodemailer = require("nodemailer");

// Creacion del transportador para el envio de correos usando SMTP
// SMTP - Gmail
// SMTP - Outlook
// SMTP - Mailtrap

const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})


// Estructura del correo electronico 
module.exports.sendMailToUser = async(userMail,token)=>{
    let info = await transporter.sendMail({
    from: process.env.USER_MAILTRAP,
    to: userMail,
    subject: "Verifica tu cuenta de correo electrónico",
    html: `<a href="http://localhost:3000/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
    });
    console.log("Message sent: %s", info.messageId);
}