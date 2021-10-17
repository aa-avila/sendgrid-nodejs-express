const sgMail = require('@sendgrid/mail');
const htmlEmail = require('./emailHtml');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);




const sendEmail = async (emailTo, emailFrom, name, lastname) => {
    try {
        const html = htmlEmail(name, lastname);

        const msg = {
            to: emailTo,
            from: emailFrom,
            subject: '¡Email enviado exitosamente!',
            text: `Este mensaje fue enviado a traves de SendGrid desde la cuenta configurada en el proyecto. Tu nombre y apellidos proporcionados son ${name} ${lastname}.`,
            html: html
        };

        await sgMail.send(msg);

    } catch (error) {
        throw error;
    }
}

module.exports = sendEmail;