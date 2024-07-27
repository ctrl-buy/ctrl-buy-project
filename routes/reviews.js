const express = require('express');
const Router = express.Router({ mergeParams: true });
// modules 
const wrapAsynch = require('../utility/wrapAsynch.js');
// model 
const { validationForReviews, isLoggedIn, isReviewAuthor } = require('../middleware.js');
const reviewsController = require('../controller/reviews.js');
// controllers 
Router.post('/', isLoggedIn, validationForReviews, wrapAsynch(reviewsController.submitReview))
Router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsynch(reviewsController.deleteReviews))

module.exports = Router;