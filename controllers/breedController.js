const { body,validationResult } = require('express-validator');

var Breed = require('../models/breed');

var async = require('async');
const breed = require('../models/breed');

exports.index = function(req, res) {

    async.parallel({
        breed_count: function(callback) {
            Breed.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        }
    }, function(err, results) {
        res.render('index', { title: 'Fluffy Paws', error: err, data: results });
    });
};


// Display list of all Breeds.
exports.breed_list = function(req, res, next) {

    Breed.find({}, 'name description')
      //.populate('name')
      .exec(function (err, list_breeds) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('breed_list', { title: 'Список пород:', breed_list: list_breeds });
      });
  
  };

// Display detail page for a specific breed.
exports.breed_detail = function(req, res, next) {

    async.parallel({
        breed: function(callback) {

            Breed.findById(req.params.id)
              //.populate('name')
              //.populate('description')
              .exec(callback);
        },
        
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.breed==null) { // No results.
            var err = new Error('Breed not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('breed_detail', { title: results.breed.title, breed: results.breed} );
    });

};

// Display Breed create form on GET.
//exports.breed_create_get = function(req, res, next) {
//    res.render('breed_form', { title: 'Create Breed'});
//};

// Handle Author create on POST.
/*exports.breed_create_post = [

    // Validate and sanitise fields.
    body('name').trim().isLength({ min: 1 }).escape().withMessage('Name must be specified.')
        .isAlpha().withMessage('Name has non-numeric characters.'),
    body('description').trim().isLength({ min: 1 }).escape().withMessage('Description must be specified.')
        .isAlpha().withMessage('Description has non-numeric characters.'),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('breed_form', { title: 'Create Breed', breed: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Check if Breed with same name already exists.
            Breed.findOne({ 'name': req.body.name })
              .exec( function(err, found_breed) {
                 if (err) { return next(err); }
      
                 if (found_breed) {
                   // Breed exists, redirect to its detail page.
                   res.redirect(found_breed.url);
                 }
                 else {
      
                   breed.save(function (err) {
                     if (err) { return next(err); }
                     // Breed saved. Redirect to breed detail page.
                     res.redirect(breed.url);
                   });
                }
            });
        }
    }
];*/

// Display Breed delete form on GET.
exports.breed_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Breed delete GET');
};

// Handle Breed delete on POST.
exports.breed_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Breed delete POST');
};

// Display Breed update form on GET.
exports.breed_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Breed update GET');
};

// Handle Breed update on POST.
exports.breed_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Breed update POST');
};