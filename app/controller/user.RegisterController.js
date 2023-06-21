const db = require("../models/");
const User = db.user;

const crypto = require("crypto")
const sm = require("../mail.sender")

exports.signUp = (req, res) => {
    User.findAll({
        limit: 1,
        where: {
            email: req.body.email
        }
    }).then(function (user) {
        if (user.length > 0) {
            return res.json({ success: false, statusCode: 302, message: 'Пользователь с таким email уже существует' });
        }
        const token = crypto.randomBytes(16).toString("hex");
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            active: 0,
            token: token
        }).then(function () {
            sm.sendMessage(req.body.email, token, "ec")
            return res.json({ success: true, statusCode: 200, message: "Регистрация прошла успешно. Для подтверждения ученой записи пройдите по ссылке отправленной на почту." });
        });
    }).catch(err => {
        console.log(err)
        res.json("error")
    });

};


exports.replaceUserData = (req, res) => {
    User.update(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        },
        { where: {
            email: req.body.oldEmail
        } }
    ).then(function () { 
        return res.json({ success: true, statusCode: 200, message: 'Данные успешно обновлены' });
    }).catch(function(){
        return res.json({ success: false, statusCode: 302, message: 'Не удалось обновить данные' }); 
    })
}

