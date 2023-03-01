const Company = require('../db/models/company');
const chalk = require('chalk');

class CompanyController {

    async showAllCompanies(req, res) {
        const companies = await Company.find({});

        console.log(chalk.greenBright(`All ${companies.length} companies in DB displayed.`));
        // console.log(companies);
        res.render('./pages/company/companies', {
            companies,
            // url: req.url,
            title: 'All Companies'
        });
    };

    async showCompany(req, res) {
        console.log(chalk.red('Someone is looking for a company:', req.url));

        const { name } = req.params;
        const company = await Company.findOne({ slug: name });

        if (company) {
            // res.send(`Company name: ${company.name}`);
            res.render('./pages/company/company',
                {
                    name: company?.name,
                    title: company?.name ?? 'None',
                    // url: req.url
                });
        } else {
            res.send('Company does not exist in DB');
        };
    };

    showAddComapnyForm(req, res) {
        res.render('./pages/company/addCompanyForm', {
            title: 'Add new company'
        });
    };

    async addCompany(req, res) {
        // console.log(req.body); //undefined? => new middleware required (body parser) 
        const company = new Company({
            name: req.body.name,
            slug: req.body.slug,
            employeesCount: req.body.employeesCount || undefined
        });
        await company.save();
        res.redirect('/companies');
    };
};

module.exports = new CompanyController();