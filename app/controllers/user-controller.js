class UserController {
    showRegister(req, res) {
        res.render('pages/auth/register', {
            title: 'Register'
        });
    }

    async register(req, res) {
        try {
            // await user.save();
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