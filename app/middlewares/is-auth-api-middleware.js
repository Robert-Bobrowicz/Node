const User = require('../db/models/user');

module.exports = async function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await User.findOne({ apiToken: token });

    if (!token) {
        res.status(403).json({ message: '403 Access forbidden' });
    }

    if (!user) {
        res.status(403).json({ message: '403 Access forbidden' });
    }

    req.user = user;

    next();
}