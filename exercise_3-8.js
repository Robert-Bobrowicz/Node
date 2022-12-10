const express = require('express');
const app = express();

const users = [
    { id: 1, name: 'Janek', email: 'janek@gmail.com' },
    { id: 2, name: 'Jasiek', email: 'jasiek@gmail.com' },
    { id: 3, name: 'Marysia', email: 'marysia@gmail.com' },
    { id: 4, name: 'Kachna', email: 'kachna@gmail.com' }
]

app.get('/', (req, res) => {
    res.send('Witaj na stronie głównej');
})

app.get('/kontakt', (req, res) => {
    res.send('Dane kontaktowe');
})

app.get('/profile', (req, res) => {
    let html = `Znaleziono ${users.length} profile użytkowników: <br>`;
    users.forEach(user => html += ` - <a href="/profile/${user.id}">${user.name} (id: ${user.id})</a> <br>`);
    res.send(html);
})

app.get('/profile/:id/:mode?', (req, res) => {
    const { id, mode } = req.params;
    const user = users.find(x => x.id === parseInt(id)); //id pobrane z adresu strony jest stringiem, dlatego tu parsuję do liczby integer
    if (!user) {
        res.send("Nie ma takiego użytkownika");
    }

    let html = `Dane użytkownika: imię ${user.name}, email: ${user.email}`;
    if (mode && mode === "szczegoly") {
        html += ` , id: ${user.id}`;
    }
    res.send(html);
})

app.listen(3000, () => console.log('server running on port 3000'));