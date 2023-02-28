const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { checkForbidenString } = require('../validators/validator');

//model nad Schema
const companySchema = new Schema({
    slug: {
        type: String,
        required: [true, '"slug" is required'],
        minLength: [3, 'slug requires minimum 3 chcracteres'],
        validate: value => checkForbidenString(value, 'slug'),
        trim: true,
        // lowercase: true
    },
    name: {
        type: String,
        required: [true, 'Company name is required']
    }
});

//setter
companySchema.path('slug').set((value) => value.toLowerCase());

const Company = mongoose.model('company', companySchema);

module.exports = Company;