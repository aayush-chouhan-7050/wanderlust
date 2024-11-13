const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        location : joi.string().required(),
        country : joi.string().required(),
        price : joi.number().required().min(0),
        image: joi.object({
            filename: joi.string().default("listingimage"),
            url: joi.string().uri().allow(null, "").default("https://www.invoicera.com/wp-content/uploads/2023/11/default-image.jpg")
        }).optional(),
        category: joi.string().valid('Iconic City', 'Room', 'Castle', 'Farm', 'Forest', 'Cool', 'Beach', 'Boat', 'Luxe').required()
    })
})

module.exports.reviewSchema = joi.object({
    review : joi.object({
        rating : joi.number().required().min(1).max(5),
        comment : joi.string().required(),
    }).required()
})