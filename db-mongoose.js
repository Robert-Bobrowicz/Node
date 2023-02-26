const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/node') //po slashu podaję nazwę bazy do której się łaczę

//model
const Company = mongoose.model('company', {
    slug: {
        type: String
    },
    name: {
        type: String
    }
});


//create element(s) in DB
async function createEl() {
    const company = new Company({
        slug: 'skystar',
        name: 'SkyShow-Star Dependent Company Ltd.'
    });
    await company.save();
}

createEl();

//find element(s) in DB
Company.find({}, (err, docs) => {
    if (err) console.log('Smth went wrong');
    console.log(docs);
});