//plik konfiguracyjny
const express = require('express');
const app = express();
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { sessionKeySecret } = require('./config');

//init db
require('./db/db-mongoose');

//session
app.use(session({
    secret: sessionKeySecret,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },   //2 days in ms
    resave: false
}));

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
app.use(cookieParser());

//mount routes
app.use(require('./routes/web'));

module.exports = app;