const express = require('express');
const router = new express.Router();
const CompanyController = require('../controllers/api/company-controller');

router.get('/companies', CompanyController.showAllCompanies);

module.exports = router;