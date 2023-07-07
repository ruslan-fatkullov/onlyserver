
const hbc = require("./config/host.config")

const nodemailer = require('nodemailer');


exports.sendMessage = async (email, tokenOrPassword, subject) => {

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 587,
        secure: true,
        auth: {
            user: 'fatkullov@inbox.ru',
            pass: 'YURwtL00AtUJFjhAqk0c'
        }
    });

    // Message object
    let message = {
        from: 'Sender Name <noreply@get-esvo-launcher.ru>',
        to: 'Recipient <fatkullov1999@yandex.ru>',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message + " \ " + err.name + " \ " + err.stack);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

}
