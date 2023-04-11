const express = require('express');
const router = new express.Router();
const CompanyController = require('../controllers/api/company-controller');
const UserController = require('../controllers/api/user-controller');
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

const authMiddleware = require('../middlewares/is-auth-api-middleware');

router.get('/companies', CompanyController.showAllCompanies);
router.post('/companies', authMiddleware, CompanyController.addCompany);
router.put('/companies/:slug', authMiddleware, upload.single('image'), CompanyController.editCompany);
router.delete('/companies/:slug', authMiddleware, CompanyController.deleteCompany);

router.post('/login', UserController.login);

module.exports = router;