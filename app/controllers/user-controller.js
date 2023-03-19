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
            res.redirect('/login');
        } catch (err) {
            console.log(err);
            res.render('pages/auth/register', {
                errors: err.errors,
                form: req.body
            })
        }
    }

    showLogin(req, res) {
        res.render('pages/auth/login', {
            title: 'Log in'
        });
    }

    async login(req, res) {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.render('pages/auth/login', {
                form: req.body,
                title: 'Log in',
                errors: true
            })
        }

        const isValidPassword = user.comparePassword(req.body.password);
        if (!isValidPassword) {
            return res.render('pages/auth/login', {
                form: req.body,
                title: 'Log in',
                errors: true
            })
        }

        req.session.user = {
            _id: user._id,
            email: user.email
        };
        res.redirect('/');
    }
}

module.exports = new UserController();