const express = require("express");

const router = express.Router()

const SignInController = require("../controller/user.RegisterController.js");
const LoginController = require("../controller/user.LoginController.js");
const userController = require("../controller/user.userController.js");
const userAdminController = require("../controller/user.AdminComtroller.js");

// удаление пользователя по id
router.put("/updateUser", userAdminController.UpdateUserById)

// удаление пользователя по id
router.delete("/deleteUser", userAdminController.DeleteUserById)

// получение всех пользователей
router.get("/getAllUser", userAdminController.GetAllUser)

// регистрация нового пользователя
router.get("/getUserByEmail", userController.getUserByEmail);

// смена пароля
router.post("/changePassword", LoginController.changePassword);

// регистрация нового пользователя
router.post("/signUp", SignInController.signUp);

// авторизация пользователя
router.post("/login", LoginController.LogIn);

// подтверждение аккаунта
router.get("/emailConfirm", LoginController.EmailConfirm);

// оптравка ссылки на форму замены пароля
router.post("/changePassToEmail", LoginController.ChangePasswordSendToEmail)

// отправка ссылки на подтверждение пароля
router.post("/sendLinkToMail", LoginController.EmailConfirmSendMessage)

// замена данных о пользователе
router.post("/replaceData", SignInController.replaceUserData)


module.exports = router;