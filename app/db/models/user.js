const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateEmail } = require('../validators/validator');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email ie required"],
        lowercase: true,
        trim: true,
        unique: [true, "This email exixts in DB."],
        validate: [validateEmail, 'Correct email, please.']
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'minimum 4 charactres are required.']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;