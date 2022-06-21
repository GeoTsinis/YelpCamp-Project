const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews')

//adding reviews for a specific campground
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));
 
 //deleting review from campground
 router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));
 
module.exports = router;