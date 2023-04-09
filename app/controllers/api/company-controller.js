const companyController = require('../company-controller');
const Company = require('../../db/models/company');
const chalk = require('chalk');

class CompanyController {
    async showAllCompanies(req, res) {
        const companies = await Company.find();
        console.log(chalk.greenBright('all companies get by api'));
        res.json(companies);
    };
};

module.exports = new CompanyController();