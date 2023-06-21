const db = require("../models");
const User = db.user;

exports.getUserByEmail = (req, res) => {
    User.findOne(
        {
            where:
                {email: req.query.email}
        }).then((result) => {
        if (!(result == null)) {
            res.json({firstName: result.firstName, lastName: result.lastName, email: result.email})
        } else {
            res.json({message: "такого пользователя нет"})
        }
    }).catch((err => {
        res.json({message: "ошибка доступа к базе данных"})
        console.log(err)
    }))
}