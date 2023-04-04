// routes for web adressess
const express = require('express');
const router = new express.Router();
const CompanyController = require('../controllers/company-controller');
const PageController = require('../controllers/page-controller');
const ContactControler = require('../controllers/contact-contoller');
const UserController = require('../controllers/user-controller');

router.get('/', PageController.showHome);
router.get('/companies', CompanyController.showAllCompanies);
router.get('/companies/:name', CompanyController.showCompany);

router.get('/admin/companies/add', CompanyController.showAddComapnyForm);
router.post('/admin/companies/add', CompanyController.addCompany);
router.get('/admin/companies/:name/edit', CompanyController.showEditComapnyForm);
router.post('/admin/companies/:name/edit', CompanyController.editCompany);
router.get('/admin/companies/:name/delete', CompanyController.deleteCompany);

router.get('/register', UserController.showRegister);
router.post('/register', UserController.register);

router.get('/login', UserController.showLogin);
router.post('/login', UserController.login);

router.get('/logout', UserController.logout);

router.get('/kontakt', ContactControler.showContact);
router.get('*', PageController.showNotFound);

module.exports = router;