const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello express server!')
})

app.get('/kontakt', (req, res) => {
    res.send('Dane kontaktowe')
})

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})