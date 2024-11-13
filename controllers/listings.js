const Listing = require("../models/listing.js");
const axios = require('axios');
const apiKey = process.env.MAP_TOKEN;

module.exports.index = 
async(req,res)=>{
    const allListings = await Listing.find();
    res.render("listings/index",{allListings});
}
module.exports.newListing = async(req,res)=>{
    res.render("listings/new");
}
module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const list = await Listing.findById(id).populate({path : "reviews",populate:{ path : "author"},}).populate("owner");
    if (!list){
        req.flash("error" , "Listing Does Not Exist !")  
        res.redirect("/listings")
    }
    res.render("listings/show",{list});
}
module.exports.postNewListing = async(req,res)=>{
    let response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(req.body.listing.location)}&key=${apiKey}`)
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id
    newListing.image = { filename,url}
    const location = response.data.results[0].geometry;
    const coordinates = [location.lng, location.lat];
    newListing.geometry.coordinates = [coordinates]
    await newListing.save().then(res=>{
       console.log("Data Saved")
   })
   console.log(newListing)
   req.flash("success" , "New Listing Created Successfully !")
   res.redirect("/listings")
}
module.exports.getEditForm = async(req,res)=>{
    let {id} = req.params;
    const list = await Listing.findById(id);
    if (!list){
        req.flash("error" , "Listing Does Not Exist !")  
        res.redirect("/listings")
    }
    let originalImage = list.image.url;
    originalImage.replace("/upload","/upload/h_150,w_75")
    res.render("listings/edit",{list});
}
module.exports.putEditForm = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file!=="undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    
    req.flash("success" , "Listing Updated !")
    res.redirect(`/listings/${id}`)
}
module.exports.destroy = async(req,res)=>{
    let {id} = req.params;
    let deleteList = await Listing.findByIdAndDelete(id);
    console.log(deleteList);
    req.flash("success" , "Listing Deleted !")
    res.redirect(`/listings`);
}