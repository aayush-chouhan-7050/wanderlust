if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride =require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const listings =  require("./routes/listings.js")
const reviews =  require("./routes/reviews.js")
const users =  require("./routes/user.js")
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const { cookie } = require("express/lib/response.js");
const atlasDB_URL = process.env.DB_URL;

const store = MongoStore.create({
    mongoUrl : atlasDB_URL,
    crypto:{
        secret : process.env.SECRET 
    },
    touchAfter : 24 * 3600 ,
});
store.on("error",()=>{
    console.log("Error in session store ",err);
});
const sessionOptions = {
    store,
    secret :  process.env.SECRET,
    resave : false,
    saveUninitialized : true ,
    cookie :{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000 , 
        maxAge : 7 * 24 * 60 * 60 * 1000 ,
        httpOnly : true
    }
}
app.use(session(sessionOptions));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
app.engine('ejs', ejsMate);


main().then(()=>{
    console.log("Connected to Database : wanderlust ")
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(atlasDB_URL);

}
app.listen(8080,()=>{
    console.log("Listening to Port : 8080 ");
})

app.use(passport.initialize());
app.use(passport.session());
passport.use( new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",(req,res)=>{
    res.redirect("/listings")
})
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

//User Route 
app.use("/",users);

// Listing Route 
app.use("/listings",listings);

// Listing Route 
app.use("/listings/:id/reviews",reviews);


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
})
app.use((err,req,res,next)=>{
    console.log(req.body);
    let{StatusCode = 500,message = "Something went wrong"} = err;
    res.status(StatusCode).render("error.ejs",{err});
})