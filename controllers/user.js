const User = require("../models/user");
module.exports.getSignup = (req,res)=>{
    res.render("users/signup.ejs")
}
module.exports.postSignup =  async(req,res)=>{
    try {
        let {name ,email ,dob,address,phone_no,username,password} =req.body;
    let user =  new User({name ,email ,dob,address,phone_no,username});
    let registeredUser = await User.register(user , password);
    console.log(registeredUser)
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome To Wanderlust")
        res.redirect("/listings");
    })
    
    } catch (e) {
        req.flash("error",e.message)
        res.redirect("/signup")
    }
    
}
module.exports.getLogin = (req,res)=>{
    res.render("users/login.ejs")
}
module.exports.postLogin =  async(req,res)=>{
    req.flash("success", "Welcome To Wanderlust")
    let redirectedUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectedUrl)
}
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged Out");
        res.redirect("/listings");
    });
}