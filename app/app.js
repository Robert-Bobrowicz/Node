//plik konfiguracyjny
const express = require('express');
const app = express();
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const chalk = require('chalk');

//init db
require('./db/db-mongoose');

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join('./views'));
app.use(ejsLayouts);
app.set('layout', './layouts/main');
app.use(express.static('public'));

//mount routes
app.use(require('./routes/web'));

module.exports = app;