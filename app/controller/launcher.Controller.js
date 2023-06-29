const fs = require("fs");
const file_config = require("../file_directory/file.config")

exports.DownLoadLauncher = (req, res) => {
    if(fs.existsSync(file_config.FILE_DIRECTORY+"\\setup.exe")){
        return res.download(file_config.FILE_DIRECTORY + "\\setup.exe")
        
    }
    return res.status(400).json({message: "К сожалению не получается скачать файл"})

}