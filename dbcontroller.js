require("dotenv").config()

const uri = `mongodb+srv://${process.env.MONGODBUSERNAME}:${process.env.MONGODBPASSWORD}@starship.lq52w.mongodb.net/${process.env.MONGODBNAME}?retryWrites=true&w=majority`
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    module.exports = client;
    client.close();
});