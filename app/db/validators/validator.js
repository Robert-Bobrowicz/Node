module.exports = {
    checkForbidenString(value, forbidenString) {
        if (value === forbidenString) {
            throw new Error(`Name ${forbidenString} is not allowed to use for company slug.`);
        }
    },

    validateEmail(email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    }
};