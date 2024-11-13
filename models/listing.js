const mongoose =  require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");

const listingSchema = new Schema({
    title : {
        type : String,
        required :true 
    },
    description : {
        type : String
    },
    image : {
        filename: {
            type: String,
            default : "listingimage"
          },
          url: {
            type: String,
            default : "https://www.invoicera.com/wp-content/uploads/2023/11/default-image.jpg",
            set : (v) => v === "" ? "https://www.invoicera.com/wp-content/uploads/2023/11/default-image.jpg" : v
          }
            },
    price : {
        type : Number,
        default : "0"
    },
    location : {
        type : String
    },
    country : {
        type : String
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
       type : Schema.Types.ObjectId,
       ref : "User"
    },
    geometry : {
        type: {
            type: String,
            enum: ['Point'],
            default : "Point",
          },
          coordinates: {
            type: [[Number]],
            required: true
          }
    },
    category : {
            type: String,
            enum: ["Iconic City","Room","Castle","Farm","Forest","Cool","Beach","Boat","Luxe"]
    }
})
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing) {
        await Review.deleteMany({ _id : { $in: listing.reviews}});
    }
})
const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;