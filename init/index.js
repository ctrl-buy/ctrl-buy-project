var mongoose = require('mongoose');
let Initdata = require('./data.js');
let listing = require('../models/listing.js');


// varibales 
const MongoUrl = "mongodb://127.0.0.1:27017/ctrlbuy";



// connection setup 
main().then((res) => {
    console.log("DataBase connected!")
}).catch((err) => {
    console.log(err)
});
async function main() {
    await mongoose.connect(MongoUrl)
};


initDB = async () => {
    await listing.deleteMany({});
    Initdata.data = Initdata.data.map((obj) => ({ ...obj, owner: '669cd2f723bc108e6f86f9ad' }))
    await listing.insertMany(Initdata.data)
    console.log('data saved')
};



initDB();