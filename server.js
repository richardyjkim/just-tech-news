const express = require('express');
const { sequelize } = require('./models/user');
const routes = require('./routes');
const sequlize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on onnection to db and server

sequelize.sync({force:false}).then(() => {
  app.listen(PORT, ()=> console.log('Now listening'))
});