const mongoose =  require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    dob : {
        type : Date,
        required : true
    },
    
    phone_no : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required: true
    }
}) 
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User" , userSchema);