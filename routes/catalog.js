var express = require('express');
var router = express.Router();

// Require controller modules.
var breed_controller = require('../controllers/breedController');

/// BREED ROUTES ///

// GET catalog home page.
router.get('/', breed_controller.index);

// GET request for creating a Breed. NOTE This must come before routes that display Breed (uses id).
//router.get('/breed/create', breed_controller.breed_create_get);

// POST request for creating Breed.
//router.post('/breed/create', breed_controller.breed_create_post);

// GET request to delete Breed.
router.get('/breed/:id/delete', breed_controller.breed_delete_get);

// POST request to delete Breed.
router.post('/breed/:id/delete', breed_controller.breed_delete_post);

// GET request to update Breed.
router.get('/breed/:id/update', breed_controller.breed_update_get);

// POST request to update Breed.
router.post('/breed/:id/update', breed_controller.breed_update_post);

// GET request for one Breed.
router.get('/breed/:id', breed_controller.breed_detail);

// GET request for list of all Breed items.
router.get('/breeds', breed_controller.breed_list);

module.exports = router;