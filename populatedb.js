#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

var async = require('async')
var Breed = require('./models/breed')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var breeds = []

function breedCreate(name, description, img, cb) {
    var breed = new Breed({
         name: name,
         description: description,
         img: img,
        });
         
    breed.save(function (err) {
      if (err) {
        cb(err, null);
        return;
      }
      console.log('New Breed: ' + breed);
      breeds.push(breed)
      cb(null, breed);
    }   );
  }

  function createBreeds(cb) {
    async.parallel([
        function(callback) {
            breedCreate('Test Breed 1', 'Description of test breed 1', 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Black-Magic-Big-Boy.jpg',  callback);
          },
          function(callback) {
            breedCreate('Test Breed 2', 'Description of test breed 2', 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Black-Magic-Big-Boy.jpg' ,callback)
          },
          function(callback) {
            breedCreate('Test Breed 3', 'Description of test breed 2', 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Black-Magic-Big-Boy.jpg' ,callback)
          }
        ],
        // optional callback
        cb);
}

async.series([
    createBreeds
],

// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Breeds: '+breeds);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});