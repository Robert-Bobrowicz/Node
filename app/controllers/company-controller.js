const Company = require('../db/models/company');
const chalk = require('chalk');

class CompanyController {

    async showAllCompanies(req, res) {
        const companies = await Company.find({});

        console.log(chalk.greenBright(`All ${companies.length} companies in DB displayed.`));
        // console.log(companies);
        res.render('companies', {
            companies,
            url: req.url,
            title: 'All Companies'
        });
    };

    showCompany(req, res) {
        console.log(chalk.red('Someone is looking for a company:', req.url));
        const { name } = req.params;
        const companies = [
            { slug: "createserver", name: "CreateServer.com" },
            { slug: "rb", name: "RB_Development.Inc" }
        ];

        const company = companies.find(x => x.slug === name);
        if (company) {
            // res.send(`Company name: ${company.name}`);
            res.render('company',
                {
                    name: company?.name,
                    companies,
                    title: company?.name ?? 'None',
                    url: req.url
                });
        } else {
            res.send('Company does not exist in DB');
        };
    };
};

module.exports = new CompanyController();