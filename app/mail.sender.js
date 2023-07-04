
//const sendmail = require('sendmail')();
const hbc = require("./config/host.config")

const nodemailer = require('nodemailer');

//const sendmail = require('sendmail')();

exports.sendMessage = async (email, tokenOrPassword, subject) => {


    console.log("ЭТО ОТПРАВКА НА ПОЧТУ")
    const sendmail = require('sendmail')({
        logger: {
            debug: console.log,
            info: console.info,
            warn: console.warn,
            error: console.error
        },
        silent: false,
        dkim: { // Default: False
            privateKey: fs.readFileSync('./dkim-private.pem', 'utf8'),
            keySelector: 'mydomainkey'
        },
        devPort: 1025, // Default: False
        devHost: 'localhost', // Default: localhost
        smtpPort: 2525, // Default: 25
        smtpHost: 'localhost' // Default: -1 - extra smtp host after resolveMX
    });

    sendmail({
        from: 'noreply@mail.get-esvo-launcher.ru.',
        to: 'fatkullov1999@yandex.ru',
        subject: 'test sendmail',
        html: 'Mail of test sendmail ',
    }, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
    //let testEmailAccount = await nodemailer.createTestAccount(); 
    /*let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'fatkullov1999@gmail.com',
            pass: "pgsyvxdktzkgsmvi"
        }
    });

    let href = ``
    let html = ``
    let email_subject = ""
    switch (subject) {
        case "ec":
            email_subject = "Подтверждение аккаунта"
            href = `${hbc.HOST}/api/emailConfirm?token=${tokenOrPassword}&email=${email}`;
            html = `Перейдите по ссылке: <a href="${href}">${href}<a/>`;
            break;
        case "pc":
            email_subject = "Смена пароля"
            html = `Ваш новый пароль: ${tokenOrPassword}`;
            break;
    }

    let mailBody = {
        from: 'From ESVO <no-reply@get-esvo-launcher.ru>',
        to: 'fatkullov@inbox.ru',
        subject: 'email_subject',
        text: 'This is message',
        html: 'This <i>message</i> was sent from <strong>Node js</strong> server.',
    }
    console.log(mailBody)

    await transporter.sendMail(mailBody, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });*/
}
