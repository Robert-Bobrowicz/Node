module.exports = function (req, res, next) {
    // console.log('Request type: ', req.method);
    res.locals.url = req.url;
    next();
};