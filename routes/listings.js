const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js");
const listingsController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

//Get Route Listings
//Post Route Create New
router.route("/")
.get(wrapAsync(listingsController.index))
.post(isLoggedIn,upload.single("listing[image][url]"),validateListing,wrapAsync(listingsController.postNewListing));

//Get Route New Listing
router.get("/new",isLoggedIn,wrapAsync(listingsController.newListing));

//Get Route Show
//Update Route Edit
//Delete Route Show
router.route("/:id")
.get(wrapAsync(listingsController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image][url]"),validateListing,wrapAsync(listingsController.putEditForm))
.delete(isLoggedIn,isOwner,wrapAsync(listingsController.destroy));

//Get Route Show Edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingsController.getEditForm));


module.exports = router;