const User = require('../db/models/user');

class UserController {
    showRegister(req, res) {
        res.render('pages/auth/register', {
            title: 'Register'
        });
    }

    async register(req, res) {
        const user = new User({
            email: req.body.email,
            password: req.body.password
        });

        try {
            await user.save();
            // res.render('./companies', {
            //     title: 'Companies'
            // });
            res.redirect('/login');
        } catch (err) {
            console.log(err);
            res.render('pages/auth/register', {
                errors: err.errors,
                form: req.body
            })
        }
    }
}

module.exports = new UserController();