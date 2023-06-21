const express = require("express");

const router = express.Router()

const DownLoadController = require("../controller/launcher.Controller");



// скачать лаунчер
router.get("/downloadLauncher", DownLoadController.DownLoadLauncher)

module.exports = router;