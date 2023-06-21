const db = require("../models")
const Help = db.help

exports.GetAllMessage = (req, res) => {
    Help.findAll().then(function (helpMessage) {
        res.json({helpList: helpMessage})
    }).catch(err => {
        res.json({statusCode: 400, message: "Ошибка в получении списка сообщений"})
    })
}

exports.CreateHelpMessage = (req, res) => {
    Help.create(
        {
            email: req.body.email,
            fullName: req.body.fullName,
            message: req.body.message
        }
    ).then(function () {
        res.json({statusCode: 200, message: "Сообщение отправлено в техническую поддержку"})
    }).catch(err => {
        res.json({statusCode: 400, message: "Не удалось отправить сообщение в техподдержку"})
    })
}

exports.DeleteHelpMessage = (req, res) => {
    console.log(req.body)
    Help.destroy(
        {
            where:{
                id: req.body.id
            }
        },

    ).then(function () {
        res.json({statusCode: 200, message: "Сообщение удалено"})
    }).catch(err => {
        res.json({statusCode: 400, message: "Не удалось удалить сообщение "+err})
    })
}