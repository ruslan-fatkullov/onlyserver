const express = require("express");
const bodyParser = require("body-parser");

const app = express();


app.set("view engine", "hbs");

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


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
db.sequelize.sync();

