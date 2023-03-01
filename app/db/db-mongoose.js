const mongoose = require('mongoose');
const Company = require('./models/company');
const { dbUrl } = require('../config');

mongoose.set('strictQuery', true);
mongoose.connect(dbUrl, () => console.log('db connected')); //po slashu podaję nazwę bazy do której się łaczę

//create element(s) in DB
// async function createEl() {
//     const company = new Company({
//         slug: '   skyStar-2   ', //'slug', //'skylink-1',
//         name: 'SkyLink-Star 2 Inc.'
//     });

//     try {
//         await company.save();
//     } catch (err) {
//         console.log('Smth went wrong to save element(s) to DB');
//         for (const key in err.errors) {
//             console.log(err.errors[key].message);
//         }
//     }
// }

// createEl();

//find element(s) in DB
// Company.find({}, (err, docs) => {
//     if (err) console.log('Smth went wrong');
//     console.log(docs);
// });