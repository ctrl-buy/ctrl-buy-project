const joi = require('joi')
const reviews = require('./models/reviews')

module.exports.listingsSchema = joi.object({
    data: joi.object({
        modelName: joi.string().required(),
        description: joi.string().required(),
        img: joi.string().allow("", null),
        price: joi.number().min(0).required(),
        location: joi.string().required(),
        country: joi.string().required(),
    }).required()
})


module.exports.reviewsSchema = joi.object({
    review: joi.object({
        comment: joi.string().required(),
        rating: joi.number().required().min(1).max(5)
    }).required()
})