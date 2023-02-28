module.exports = {
    checkForbidenString(value, forbidenString) {
        if (value === forbidenString) {
            throw new Error(`Name ${forbidenString} is not allowed to use for company slug.`);
        }
    }
};