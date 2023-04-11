//plik konfiguracyjny
const express = require('express');
const app = express();
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { sessionKeySecret } = require('./config');
const helmet = require('helmet');
const rateLimiterMiddleware = require('./middlewares/rate-limiter-middleware');

//init db
require('./db/db-mongoose');

//helmet
app.use(helmet());

//rate-limiter
app.use(rateLimiterMiddleware);

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
app.use('/', require('./middlewares/user-middleware'));
app.use('/admin', require('./middlewares/is-auth-middleware'));

//body parser
app.use(express.urlencoded({ extended: true })); //parser for body-parser for application /x-www-form-urlencoded
app.use(cookieParser());
app.use(express.json()); //parser for application/json data processing 

//mount routes
app.use('/api', require('./routes/api'));
app.use(require('./routes/web'));

module.exports = app;