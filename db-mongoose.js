const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/node') //po slashu podaję nazwę bazy do której się łaczę

//model
const Company = mongoose.model('company', {
    slug: {
        type: String,
        required: [true, '"slug" is required'],
        minLength: [3, 'slug requires minimum 3 chcracteres'],
        validate: value => {
            if (value === 'slug') {
                throw new Error('Name "slug" is not allowed to use for company slug.');
            }
        }
    },
    name: {
        type: String,
        required: [true, 'Company name is required']
    }
});


//create element(s) in DB
async function createEl() {
    const company = new Company({
        slug: 'slug', //skylink-1',
        name: 'SkyLink One Ltd.'
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