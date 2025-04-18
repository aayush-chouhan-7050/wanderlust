const Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
module.exports.isLoggedIn = (req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl =  req.originalUrl;
        req.flash("error" , "Login Requied")
        return res.redirect("/login")
    }
    next();
}
module.exports.saveRedirectUrl = (req,res,next) =>{
    res.locals.redirectUrl = req.session.redirectUrl;
    next();
}
module.exports.isOwner = async(req,res,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error","Access denied")
        return res.redirect(`/listings/${id}`)
    }
    next();
}
module.exports.isReviewAuthor = async(req,res,next) =>{
    let {reviewId} = req.params;
    let {id} = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error","Access denied (You are not the author) !")
        return res.redirect(`/listings/${id}`)
    }
    next();
}
module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{next();}
}
module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{next();}
}