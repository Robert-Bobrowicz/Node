const User = require('../../db/models/user');

class UserController {
    async login(req, res) {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.sendStatus(401); //unauthorized
        }

        const isValidPassword = user.comparePassword(req.body.password);
        if (!isValidPassword) {
            res.sendStatus(401); //unauthorized
        }

        res.status(200).json({ apiToken: user.apiToken });
    }
}

module.exports = new UserController();