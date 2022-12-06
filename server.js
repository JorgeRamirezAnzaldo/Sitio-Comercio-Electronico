//Import express
const express = require('express');
//Import the different routes
const routes = require('./routes');
//Import sequelize connection
const sequelize = require("./config/connection");

//Initialize app variable
const app = express();

//Define PORT
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Make the app use the routes
app.use(routes);

//Sync sequelize models to the database, then turn on the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
})

