
const hbc = require("./config/host.config")

const nodemailer = require('nodemailer');


exports.sendMessage = async (email, tokenOrPassword, subject) => {
    console.log("Отправка письма...")

    let transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
            user: "fatkullov@inbox.ru",
            //pass: "Mrg39MHu@Mo:"
            pass: "6Sv0zYxqrGMcV407utHV",
        },
        tls: {
            rejectUnauthorized: false,
        },
    });


    let message = {
        from: 'noreply@get-esvo-launcher.ru',
        to: 'fatkullov@inbox.ru',
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
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

}
