const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/node') //po slashu podaję nazwę bazy do której się łaczę

//model nad Schema
const companySchema = new Schema({
    slug: {
        type: String,
        required: [true, '"slug" is required'],
        minLength: [3, 'slug requires minimum 3 chcracteres'],
        validate: value => {
            if (value === 'slug') {
                throw new Error('Name "slug" is not allowed to use for company slug.');
            }
        },
        trim: true
        // lowercase: true
    },
    name: {
        type: String,
        required: [true, 'Company name is required']
    }
});

//setter
companySchema.path('slug').set((value) => value.toLowerCase());

const Company = mongoose.model('company', companySchema);

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