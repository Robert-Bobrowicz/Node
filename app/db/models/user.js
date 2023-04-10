const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { validateEmail } = require('../validators/validator');
const randomString = require('randomstring');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email ie required"],
        lowercase: true,
        trim: true,
        unique: true, //[true, "This email exixts in DB."],
        validate: [validateEmail, 'Correct email, please.']
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'minimum 4 charactres are required.']
    },
    apiToken: String
});

//poniższe haszowanie pwoduje utworzenie nowej wartości hasła: password === set value, walidacja nigdy nie będzie prwadziwa
// userSchema.path('password').set((value) => {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(value, salt);
//     return hash;
// })

userSchema.pre('save', function (next) {
    const user = this;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    if (user.isNew) {
        user.apiToken = randomString.generate(30);
    }

    next();
});

userSchema.post('save', function (error, doc, next) {
    if (error.code === 11000) {
        error.errors = { email: { message: 'This email exixts in DB' }, password: { message: '' } }
    }

    next(error);
});

userSchema.methods = {
    comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;