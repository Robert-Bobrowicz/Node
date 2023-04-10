const express = require('express');
const router = new express.Router();
const CompanyController = require('../controllers/api/company-controller');
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

router.get('/companies', CompanyController.showAllCompanies);
router.post('/companies', CompanyController.addCompany);
router.put('/companies/:slug', upload.single('image'), CompanyController.editCompany);

module.exports = router;