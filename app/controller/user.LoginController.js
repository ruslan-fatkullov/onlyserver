const db = require("../models");
const User = db.user;
const html = require("../htmlTemplates")
const sm = require("../mail.sender")
const md5 = require('md5')


exports.LogIn = (req, res) => {
    User.findAll({
        limit: 1,
        where: {
            email: req.body.email
        }
    }).then(function (user) {
        if (user.length === 0) {
            res.json({ success: false, statusCode: 403, message: 'Пользователь с таким логином не найден' });
        } else {
            if (!(user[0].password === req.body.password)) {
                res.json({ success: false, statusCode: 403, message: 'Неверный пароль' });
            } else {
                if (user[0].active === 0) {
                    res.json({ success: true, statusCode: 201, message: 'Ваша учетная запись не подтверждена.' },);
                } else {
                    res.json({ success: true, statusCode: 200, message: 'Авторизация прошла успешно' },);
                }
            }
        }

    }).catch(err => {
        console.log(err)
        res.json({ success: false, message: 'ERROR' });
    });

};

exports.EmailConfirm = (req, res) => {
    User.findAll({
        limit: 1,
        where: {
            email: req.query.email
        }
    }).then(function (user) {
        if (user[0].token === req.query.token) {
            User.update(
                { active: 1 },
                { where: { email: req.query.email } }
            ).then(res => {
                console.log(res)
            });
            res.end(html.accountConfirm());
        } else {
            res.json({ mes: "Проблема с токеном авторизации. Обратитесь в поддержку" })
        }
    }).catch(err => {
        console.log(err)
        res.json({ success: false, errorMessage: 'ERROR' });
    });
};



exports.ChangePasswordSendToEmail = (req, res) => {

    const newPass = generatePassword()
    const hashPassword = md5(newPass);

    User.update(
        { password: hashPassword },
        { where: { email: req.body.email } }
    ).then(result => {

        sm.sendMessage(req.body.email, newPass, "pc")
        res.json({ statusCode: 200, message: "Новый пароль отправлен на почту" })
        console.log(result)
    }).catch(err => {
        res.json({ statusCode: 400, message: "Ошибка смены пароля" })
        console.log(err)
    })

};

exports.EmailConfirmSendMessage = (req, res) => {
    User.findAll({
        limit: 1,
        where: {
            email: req.body.email
        }
    }).then(function (user) {
        sm.sendMessage(user[0].email, user[0].token, "ec")
        res.json({ message: "Ссылка на подтверждение аккаунта отправлена на почту" });
    })
}

exports.changePassword = (req, res) => {
    User.update(
        { password: req.body.password },
        { where: { email: req.body.email } }
    ).then(result => {

        res.json({ statusCode: 200, message: "Пароль изменен" })
        console.log(result)

    }).catch(err => {
        res.json({ statusCode: 400, message: "Ошибка смены пароля" })
        console.log(err)
    })
}


function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    res = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
        res += charset.charAt(Math.floor(Math.random() * n));
    }
    return res;
}