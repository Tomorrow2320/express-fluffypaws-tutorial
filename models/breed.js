const { link } = require('fs');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BreedSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true, maxlength: 100},
    img: {type: String}
  }
);

BreedSchema
.virtual('url')
.get(function () {
  return '/catalog/breed/' + this._id;
});

//Export model
module.exports = mongoose.model('Breed', BreedSchema);

