const Company = require('../db/models/company');
const chalk = require('chalk');
const { Parser } = require('json2csv');

class CompanyController {

    async showAllCompanies(req, res) {
        const { q, sort, countmin, countmax } = req.query;
        const where = {};

        const page = req.query.page || 1;
        const perPage = 5;

        //search (query)
        if (q) {
            where.name = { $regex: q || '', $options: 'i' };
        }

        // filters        
        if (countmin || countmax) {
            where.employeesCount = {};
            if (countmin) where.employeesCount.$gte = countmin;
            if (countmax) where.employeesCount.$lte = countmax;
        }

        let query = Company.find(where);
        let companies;

        //pagination
        query = query.skip((page - 1) * perPage);
        query = query.limit(perPage);

        //sort
        if (sort) {
            const s = sort.split('|');
            query = query.sort({
                [s[0]]: s[1]
            });

            console.log(`company(-ies) found and sorted`);
        } else {
            companies = await Company.find({});
            console.log(chalk.greenBright(`All ${companies.length} companies in DB displayed.`));
        };

        //exec query
        companies = await query.populate('user').exec();
        const resultsCount = await Company.find(where).count();
        const pagesCount = Math.ceil(resultsCount / perPage);

        // console.log(companies);
        res.render('./pages/company/companies', {
            companies,
            // url: req.url,
            title: 'Companies',
            page: page,
            pagesCount,
            resultsCount
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
            employeesCount: req.body.employeesCount || undefined,
            user: req.session.user._id,
            image: req.file.filename
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
        company.image = req.file.filename;

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

    async getCSV(req, res) {
        const fields = [
            {
                label: 'Company name',
                value: 'name'
            },
            {
                label: 'URL',
                value: 'slug'
            },
            {
                label: 'Employees count',
                value: 'employeesCount'
            }
        ];

        const data = await Company.find();
        // console.log(data);
        const fileName = 'companies.csv';
        
    }
};

module.exports = new CompanyController();