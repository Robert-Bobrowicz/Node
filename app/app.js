//plik konfiguracyjny
const express = require('express');
const app = express();
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');

//init db
require('./db/db-mongoose');

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join('./views'));
app.use(ejsLayouts);
app.set('layout', './layouts/main');
app.use(express.static('public'));

//middleware
app.use('/', require('./middlewares/view-url-params'));

//body parser
app.use(express.urlencoded({ extended: true })); //parser for body-parser for application /x-www-form-urlencoded

//mount routes
app.use(require('./routes/web'));

module.exports = app;