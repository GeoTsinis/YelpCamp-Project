const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const res = require('express/lib/response');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(
        isLoggedIn,
        upload.array('image'),
        validateCampground,
        catchAsync(campgrounds.createCampground)
        );

//create new HINT: must be placed before id so it does not act as an id
router.get('/new', isLoggedIn, campgrounds.renderNewForm );

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(
        isLoggedIn,
        isAuthor,
        upload.array('image'),
        validateCampground,
        catchAsync(campgrounds.updateCampground)
        )
    .delete(
        isLoggedIn,
        isAuthor,
        catchAsync(campgrounds.deleteCampground)
        );

//update
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;