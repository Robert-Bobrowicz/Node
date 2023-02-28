const mongoose = require('mongoose');
const Company = require('./models/company');
const url = 'mongodb://127.0.0.1:27017/node';

mongoose.set('strictQuery', true);
mongoose.connect(url); //po slashu podaję nazwę bazy do której się łaczę

//create element(s) in DB
async function createEl() {
    const company = new Company({
        slug: '   skyStar-2   ', //'slug', //'skylink-1',
        name: 'SkyLink-Star 2 Inc.'
    });

    try {
        await company.save();
    } catch (err) {
        console.log('Smth went wrong to save element(s) to DB')
        // console.log(err.errors.slug.message);
        // console.log(err.errors.name.properties.message);
        // console.log(err.message);
        for (const key in err.errors) {
            console.log(err.errors[key].message);
        }
    }
}

createEl();

//find element(s) in DB
Company.find({}, (err, docs) => {
    if (err) console.log('Smth went wrong');
    console.log(docs);
});