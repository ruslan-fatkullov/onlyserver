const db = require("../models")
const deletedUser = db.deletedUser
const user = db.user

exports.recoverUser = (req, res) => {
    deletedUser.findOne({
        where: {
            id: req.body.id
        }
    }).then((result) => {
        user.create({
            firstName: result.dataValues.firstName,
            lastName: result.dataValues.lastName,
            email: result.dataValues.email,
            password: result.dataValues.password,
            active: result.dataValues.active,
            token: result.dataValues.token
        }).then(() => {
            deletedUser.destroy({
                where: {
                    id: req.body.id
                }
            }).then(function () {
                res.json({ message: "Пользователь восстановлен" })
            }).catch(err => {
                console.log("Ошибка при восстановлении" + err)
            })
        })
    })
}

exports.getAllDeletedUsers = (req, res) => {
    deletedUser.findAll().then((result) => {
        res.json({ deletedUsers: result })
    })
}

