// routes for web adressess
const express = require('express');
const router = new express.Router();
const chalk = require('chalk');

router.get('/', (req, res) => {
    // res.send('This is main page of the express server!');
    // res.sendFile(path.join(__dirname + '/views/home.html'));
    console.log(chalk.greenBright('Someone is looking for Main page:', req.url));
    res.render('home', {
        title: 'Main page',
        url: req.url
    });
})

router.get('/companies/:name', (req, res) => {
    console.log(chalk.red('Someone is looking for a company:', req.url));
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
                title: company?.name ?? 'None',
                url: req.url
            });
    } else {
        res.send('Company does not exist in DB');
    };
})

router.get('/kontakt', (req, res) => {
    res.send('Dane kontaktowe')
})

router.get('*', (req, res) => {
    res.render('errors/404', {
        title: '404',
        layout: 'layouts/minimalistic',
        url: req.url
    });
});

module.exports = router;