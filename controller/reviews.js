const listing = require("../models/listing");
const reviews = require("../models/reviews");

module.exports.submitReview = async (req, res) => {
    let { id } = req.params;
    let reviewData = req.body.review;
    let listData = await listing.findById(id);
    let newReview = new reviews(reviewData);
    newReview.author = req.user._id;
    console.log(newReview)
    listData.reviews.push(newReview);
    await newReview.save();
    await listData.save()
    req.flash("success", 'Review is Added')
    res.redirect(`/listings/${id}`)
};


module.exports.deleteReviews = async (req, res) => {
    let { id, reviewId } = req.params;
    let resultOflistings = await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    let resultOfReviews = await reviews.findByIdAndDelete(reviewId);
    console.log(resultOfReviews, "/n", resultOflistings);
    req.flash("success", 'Review is deleted')
    res.redirect(`/listings/${id}`);

}