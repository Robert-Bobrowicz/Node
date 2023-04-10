module.exports = function (req, res, next) {
    if (true) {
        res.status(403).json({message: '403 Access forbidden'});
    }

    next();
}