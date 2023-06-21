const express = require("express");

const router = express.Router()

const deletedUsersController = require("../controller/deletedUsers.Controller");

// восстановление пользователя
router.post("/recoverUser", deletedUsersController.recoverUser)

// получение удаленных пользователей
router.get("/getDeletedUsers", deletedUsersController.getAllDeletedUsers)


module.exports = router;