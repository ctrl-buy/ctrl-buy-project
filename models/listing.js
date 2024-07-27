// model of listing of basic data about mobile phone 
var mongoose = require('mongoose');
let Schema = mongoose.Schema; // it will repeat so declare once
const Review = require('./reviews.js');



let MobileSchema = new Schema({
    modelName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        url: String,
        filename: String
    },
    price: {
        type: Number,
        required: true,
    },
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }

    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

MobileSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });

    }
})
const listing = mongoose.model('listing', MobileSchema);


module.exports = listing;