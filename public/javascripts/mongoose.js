const mongoose = require('mongoose');
const bluebird = require('bluebird');

// Creating a mongoose conection
mongoose.connect('mongodb://carlo:Dittoenbram1234@carlo-shard-00-00-nwaxe.mongodb.net:27017,carlo-shard-00-01-nwaxe.mongodb.net:27017,carlo-shard-00-02-nwaxe.mongodb.net:27017/speakup?ssl=true&replicaSet=carlo-shard-0&authSource=admin', {
    useMongoClient: true,
    /* other options */
});

// Mongoose promiss
mongoose.Promise = bluebird;

var userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Register models
mongoose.model('user', userSchema);