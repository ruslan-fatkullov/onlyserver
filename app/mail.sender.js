
//const sendmail = require('sendmail')();
const hbc = require("./config/host.config")

//const nodemailer = require('nodemailer');

const sendmail = require('sendmail')();

exports.sendMessage = async (email, tokenOrPassword, subject) => {


    console.log("ЭТО ОТПРАВКА НА ПОЧТУ")

    //let testEmailAccount = await nodemailer.createTestAccount(); 
    /*let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: "fatkullov@inbox.ru",
            pass: "eNVWjr0tttTma2t9BLyv"
        }
    });*/

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
        from: 'Check <no-reply@get-esvo-launcher.ru>',
        to: 'fatkullov@inbox.ru',
        subject: 'email_subject',
        text: 'This is message',
        html: 'This <i>message</i> was sent from <strong>Node js</strong> server.',
    }
    console.log(mailBody)

    await sendmail(mailBody, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
