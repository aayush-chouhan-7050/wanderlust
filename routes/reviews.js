const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewControllers = require("../controllers/reviews.js")

// Post Reviews 
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewControllers.postReview));
// Delete Reviews 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControllers.destroyReview));

module.exports =  router;