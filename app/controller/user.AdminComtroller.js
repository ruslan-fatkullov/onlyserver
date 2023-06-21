const db = require("../models")
const User = db.user
const deletedUser = db.deletedUser

exports.GetAllUser = (req, res) => {
    User.findAll().then(function (user) {
        res.json({ users: user })
    }).catch(err => {
        console.log("Ошибка в получении пользователей" + err)
    })
}

exports.DeleteUserById = (req, res) => {
    User.findOne({
        where: {
            id: req.query.id
        }
    }).then((result) => {
        deletedUser.create({
            firstName: result.dataValues.firstName,
            lastName: result.dataValues.lastName,
            email: result.dataValues.email,
            password: result.dataValues.password,
            active: result.dataValues.active,
            token: result.dataValues.token
        }).then(function () {
            User.destroy({
                where: {
                    id: req.query.id
                }
            }).then(function () {
                res.json({ message: "Пользователь удален" })
            }).catch(err => {
                console.log("Ошибка при удалении" + err)
            })
        });
    })
}

exports.UpdateUserById = (req, res) => {
    User.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        active: req.body.active,
    }, {
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.json({ message: "Пользователь обновлен" })
    }).catch(err => {
        console.log("Ошибка при обновлении" + err)
    })
}