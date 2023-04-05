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

    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }

    showProfile(req, res) {
        res.render('pages/auth/profile', {
            form: req.session.user
        });
    }

    async update(req, res) {
        const user = await User.findById(req.session.user._id);
        user.email = req.body.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        try {
            await user.save();
            req.session.user.email = user.email;
            res.redirect(back); //res.redirect('/admin/profile');
        } catch (e) {
            res.render('pages/auth/profile', {
                errors: e.errors,
                form: req.body
            });
        }
    }
}

module.exports = new UserController();