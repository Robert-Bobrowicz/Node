const express = require('express');
const app = express();
const PORT = 3000;
const chalk = require('chalk');

app.get('/', (req, res) => {
    res.send('This is main page of the express server!')
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
        res.send(`Company name: ${company.name}`)
    } else {
        res.send('Company does not exist in DB');
    };
})

app.get('/kontakt', (req, res) => {
    res.send('Dane kontaktowe')
})

app.listen(PORT, () => {
    console.log(chalk.blue(`Server is listening on port: ${PORT}`));
})