
const hbc = require("./config/host.config")

const nodemailer = require('nodemailer');


exports.sendMessage = async (email, tokenOrPassword, subject) => {
    console.log("Отправка письма...")
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: "smtp.get-esvo-launcher.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "fatkullov@inbox.ru", // generated ethereal user
          pass: "ZpdfkXsrGA81pifXgTkb" // generated ethereal password
        }
    });

    // Message object
    let message = {
        from: 'noreply@get-esvo-launcher.ru',
        to: 'fatkullov1999@yandex.ru',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Ошибка ' + err.message + " \ " + err.name + " \ " + err.stack);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

}
