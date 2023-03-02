module.exports = function (req, res, next) {
    // console.log('Request type: ', req.method);
    res.locals.url = req.url;
    res.locals.errors = null; //variable needed for error validation
    res.locals.form = {}; //variable needed for form validation (data left and visible in a form)
    next();
};