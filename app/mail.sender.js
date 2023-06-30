
//const sendmail = require('sendmail')();
const hbc = require("./config/host.config")

const nodemailer = require('nodemailer');



exports.sendMessage = (email, tokenOrPassword, subject) =>  {


    console.log("ЭТО ОТПРАВКА НА ПОЧТУ")

    //let testEmailAccount = await nodemailer.createTestAccount(); 
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 25,
        secure: false,
        auth: {
            user: "fatkullov@inbox.ru",
            pass: "eNVWjr0tttTma2t9BLyv"
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

    const mailBody = {
        from: hbc.MAIL_DOMAIN,
        to: email,
        subject: email_subject,
        text: 'This is message',
        html: html,
    }
    console.log(mailBody)

    transporter.sendMail(mailBody);
    /*.then((result)=>{
        return result
    }).catch((err) => {
        return err
    });*/
}
