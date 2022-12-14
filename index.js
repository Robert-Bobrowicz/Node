const express = require('express');
const app = express();
const PORT = 3000;
const chalk = require('chalk');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');


//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));
app.use(ejsLayouts);
app.set('layout', './layouts/main');

app.get('/', (req, res) => {
    // res.send('This is main page of the express server!');
    // res.sendFile(path.join(__dirname + '/views/home.html'));
    res.render('home', {
        title: 'Main page'
    });
})

app.get('/companies/:name', (req, res) => {
    console.log(chalk.red('Someone is looking for a company:', req.params));
    const { name } = req.params;
    const companies = [
        { slug: "createserver", name: "CreateServer.com" },
        { slug: "rb", name: "RB_Development.Inc" }
    ];

    const company = companies.find(x => x.slug === name);
    if (company) {
        // res.send(`Company name: ${company.name}`);
        res.render('company',
            {
                name: company?.name,
                companies,
                title: company?.name ?? 'None'
            });
    } else {
        res.send('Company does not exist in DB');
    };
})

app.get('/kontakt', (req, res) => {
    res.send('Dane kontaktowe')
})

app.get('*', (req, res) => {
    res.render('errors/404', {
        title: '404',
        layout: 'layouts/minimalistic'
    });
})

app.listen(PORT, () => {
    console.log(chalk.green(`Server is listening on port: ${PORT}`));
})