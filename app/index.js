//uruchomienie serwera
const app = require('./app.js');
const { port } = require('./config');
const chalk = require('chalk');

app.listen(port, () => {
    console.log(chalk.green(`Server is listening on port: ${port}`));
});