const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const reviewController = require("../controllers/user")

router.route("/signup")
.get(reviewController.getSignup)
.post(wrapAsync(reviewController.postSignup))

router.route("/login")
.get(reviewController.getLogin)
.post(saveRedirectUrl,passport.authenticate("local", { failureRedirect: '/login'  , failureFlash: true})
,wrapAsync(reviewController.postLogin))

router.get("/logout",reviewController.logout);
module.exports =  router;