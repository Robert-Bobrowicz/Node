const Company = require('../db/models/company');
const chalk = require('chalk');

class CompanyController {

    async showAllCompanies(req, res) {
        const { q } = req.query;
        let companies;

        if (q) {
            companies = await Company.find({ name: { $regex: q || '', $options: 'i' } });
            console.log(`company found`);
        } else {
            companies = await Company.find({});
            console.log(chalk.greenBright(`All ${companies.length} companies in DB displayed.`));
        };

        // console.log(companies);
        res.render('./pages/company/companies', {
            companies,
            // url: req.url,
            title: 'Companies'
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


    //add Company
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

        try {
            await company.save();
            res.redirect('/companies');
        } catch (err) {
            res.render('./pages/company/addCompanyForm', {
                title: 'Error',
                errors: err.errors,
                form: req.body
            });
        };
    };

    //Edit Company
    async showEditComapnyForm(req, res) {
        const { name } = req.params;
        const company = await Company.findOne({ slug: name });
        res.render('./pages/company/editCompany', {
            title: 'Edit company',
            form: company
        });
    };

    async editCompany(req, res) {
        const { name } = req.params;
        const company = await Company.findOne({ slug: name });
        company.name = req.body.name;
        company.slug = req.body.slug;
        company.employeesCount = req.body.employeesCount;

        try {
            await company.save();
            res.redirect('/companies');
        } catch (err) {
            res.render('./pages/company/editCompany', {
                title: 'Error',
                errors: err.errors,
                form: req.body
            });
        };
    };

    async deleteCompany(req, res) {
        const { name } = req.params;

        try {
            await Company.deleteOne({ slug: name });
            console.log(chalk.red(`Company ${name} deleted from DB.`));
            res.redirect('/companies');
        } catch (err) {
            console.log('Smth went wrong - action: delete company.')
        }
    };
};

module.exports = new CompanyController();