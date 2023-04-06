// routes for web adressess
const express = require('express');
const router = new express.Router();
const CompanyController = require('../controllers/company-controller');
const PageController = require('../controllers/page-controller');
const ContactControler = require('../controllers/contact-contoller');
const UserController = require('../controllers/user-controller');

const path = require('path');
const multer = require('multer');
const store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const name = Date.now() + path.extname(file.originalname);
        cb(null, name);
    }
});
const upload = multer({
    storage: store
});

router.get('/', PageController.showHome);
router.get('/companies', CompanyController.showAllCompanies);
router.get('/companies/:name', CompanyController.showCompany);

router.get('/admin/companies/add', CompanyController.showAddComapnyForm);
router.post('/admin/companies/add', upload.single('image'), CompanyController.addCompany);
router.get('/admin/companies/:name/edit', CompanyController.showEditComapnyForm);
router.post('/admin/companies/:name/edit', upload.single('image'), CompanyController.editCompany);
router.get('/admin/companies/:name/delete', CompanyController.deleteCompany);

router.get('/register', UserController.showRegister);
router.post('/register', UserController.register);

router.get('/admin/profile', UserController.showProfile);
router.post('/admin/profile', UserController.update);

router.get('/login', UserController.showLogin);
router.post('/login', UserController.login);

router.get('/logout', UserController.logout);

router.get('/kontakt', ContactControler.showContact);
router.get('*', PageController.showNotFound);

module.exports = router;