// routes for web adressess
const express = require('express');
const router = new express.Router();
const CompanyController = require('../controllers/company-controller');
const PageController = require('../controllers/page-controller');
const ContactControler = require('../controllers/contact-contoller');


router.get('/', PageController.showHome);
router.get('/companies', CompanyController.showAllCompanies);
router.get('/companies/:name', CompanyController.showCompany);
router.get('/kontakt', ContactControler.showContact);
router.get('*', PageController.showNotFound);

module.exports = router;