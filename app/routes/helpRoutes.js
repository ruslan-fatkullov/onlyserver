const express = require("express");

const router = express.Router()

const helpController = require("../controller/help.Controller");

// получение списка всех сообщений
router.get("/getAllHelpMessage", helpController.GetAllMessage)

// отправка сообщения
router.post("/sendHelpMessage", helpController.CreateHelpMessage)

// отправка сообщения
router.post("/deleteHelpMessage", helpController.DeleteHelpMessage)

module.exports = router;