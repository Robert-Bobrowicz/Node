const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello express server!')
})

app.get('/companies/:name', (req, res) => {
    console.log('Someone is looking for a company:', req.params);
    const { name } = req.params;
    const companies = [
        { slug: "createserver", name: "CreateServer.com" },
        { slug: "rbdevelopment", name: "RB_Development.Inc" }
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
    console.log(`Server is listening on port: ${PORT}`)
})