
const sendmail = require('sendmail')();
const hbc = require("./config/host.config")



exports.sendMessage = (email, tokenOrPassword, subject) => {

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
        html: html,
    }
    sendmail(mailBody, function (err, reply) {
        if (err) {
            return {success: false, result: err}
        } 
        return {success: true, result: reply}
        
    });
}
