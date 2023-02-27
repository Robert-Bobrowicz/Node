//uruchomienie serwera
const app = require('./app.js');
const PORT = 3000;
const chalk = require('chalk');

app.listen(PORT, () => {
    console.log(chalk.green(`Server is listening on port: ${PORT}`));
});