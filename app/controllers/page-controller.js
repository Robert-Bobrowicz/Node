const chalk = require('chalk');

class PageController {
    showHome(req, res) {
        // res.send('This is main page of the express server!');
        // res.sendFile(path.join(__dirname + '/views/home.html'));
        console.log(chalk.greenBright('Someone is looking for Main page:', req.url));
        res.render('home', {
            title: 'Main page',
            url: req.url
        });
    };

    showNotFound(req, res) {
        res.render('errors/404', {
            title: '404',
            layout: 'layouts/minimalistic',
            url: req.url
        });
    };
};

module.exports = new PageController();