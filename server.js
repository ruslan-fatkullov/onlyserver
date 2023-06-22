const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
};

app.set("view engine", "hbs");



app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./app/routes/userRoutes.js");
const helpRoutes = require("./app/routes/helpRoutes.js");
const launcherRoutes = require("./app/routes/launcherRoutes.js");
const deletedUsersRoutes = require("./app/routes/deletedUserRoutes.js");

app.use("/api", userRoutes);
app.use("/help", helpRoutes);
app.use("/launcher", launcherRoutes);
app.use("/deleted", deletedUsersRoutes);

app.get("/", function(request, response){
  response.sendFile(__dirname + "/index.html");
});

const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "testdb",
  password: ""
});
 connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });

const PORT = process.env.PORT || 8080;
app.listen(PORT, '80.78.245.52',() => {
  console.log(`Server is running on port ${PORT}.`);
});

/*const db = require("./app/models");
db.sequelize.sync();
*/
