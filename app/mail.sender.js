
const hbc = require("./config/host.config")

const nodemailer = require('nodemailer');


exports.sendMessage = async (email, tokenOrPassword, subject) => {



    //let testEmailAccount = await nodemailer.createTestAccount(); 
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'fatkullov1999@gmail.com',
            pass: "kakady1999"
        }
    },
    {
        from: 'Mailer test <fatkullov1999@gmail.com>',
    }
    );

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
        from: 'From ESVO <fatkullov1999@gmail.com>',
        to: 'fatkullov@inbox.ru',
        subject: 'email_subject',
        text: 'This is message',
        html: 'This <i>message</i> was sent from <strong>Node js</strong> server.',
    }
    console.log("--------------------------------START MAIL SEND--------------------------------")
    console.log(mailBody)

    await transporter.sendMail(mailBody, function (error, info) {
        if (error) {
            console.log('Это ошибка: ');
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        console.log("--------------------------------END MAIL SEND--------------------------------")
    });
}
