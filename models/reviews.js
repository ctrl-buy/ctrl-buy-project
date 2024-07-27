const { types, date, ref } = require('joi');
var mongoose = require('mongoose');
let { Schema } = mongoose;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});


let reviews = mongoose.model('Review', reviewSchema);
module.exports = reviews;