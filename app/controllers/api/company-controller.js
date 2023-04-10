const companyController = require('../company-controller');
const Company = require('../../db/models/company');
const chalk = require('chalk');

class CompanyController {
    async showAllCompanies(req, res) {
        const companies = await Company.find();
        console.log(chalk.greenBright('all companies get by api'));
        res.json(companies);
    };

    async addCompany(req, res) {
        const company = new Company({
            name: req.body.name,
            slug: req.body.slug,
            employeesCount: req.body.employeesCount || undefined,
            user: req.body.user
            // user: req.session.user._id,
            // image: req.file.filename
        });

        try {
            await company.save();
            res.status(201).json(company);
        } catch (err) {
            res.status(422).json({ errors: err.errors });
        };
    };

    async editCompany(req, res) {
        const { slug } = req.params;
        const company = await Company.findOne({ slug: slug });
        if (req.body.name) company.name = req.body.name;
        if (req.body.slug) company.slug = req.body.slug;
        if (req.body.employeesCount) company.employeesCount = req.body.employeesCount;
        // company.image = req.file.filename;

        try {
            await company.save();
            res.status(200).json(company);
        } catch (err) {
            res.status(422).json({ errors: err.errors });
        };
    };
};

module.exports = new CompanyController();