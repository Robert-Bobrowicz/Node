
class ContactControler {
    showContact(req, res) {
        res.send('Dane kontaktowe')
    };
};

module.exports = new ContactControler();