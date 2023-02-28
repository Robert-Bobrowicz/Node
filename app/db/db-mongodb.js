const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017');
const dbName = 'node';


async function main() {
    await client.connect();
    console.log('successfully connected to DB');

    //create new collection 
    const db = client.db(dbName);
    await db
        .collection('companies')
        .insertOne({ slug: "skyshow", name: "SkyShow International Entertainment Ltd." });

    //find element(s) in DB
    const res = await db.collection('companies').findOne({ slug: "skyshow" });
    const resAll = await db.collection('companies').find({}).toArray();
    const resId = await db.collection('companies').find({ _id: new ObjectId('63fb5254213ae46678a53281') }).toArray();
    console.log(res);
    console.log(resAll);
    console.log(resId);

    //delete element(s) from DB collection
    // await db.collection('companies').deleteMany({ slug: "skyshow" });

    // close connection to DB 
    // client.close(); //lub dodać finnally() do main()
}

main()
    .catch(ex => console.log('Something went wrong. ', ex))
    .finally(() => client.close());