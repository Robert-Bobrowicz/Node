const express = require('express');
const router = new express.Router();
const CompanyController = require('../controllers/api/company-controller');

router.get('/companies', CompanyController.showAllCompanies);
router.post('/companies', CompanyController.addCompany);
router.put('/companies/:slug', CompanyController.editCompany);

module.exports = router;