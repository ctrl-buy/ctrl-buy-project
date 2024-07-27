const listing = require('./models/listing');
const reviews = require('./models/reviews');
const { listingsSchema, reviewsSchema } = require('./schema');
const ExpressError = require('./utility/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.originalUrl)
    if (!req.isAuthenticated()) {
        req.session.redirectURL = req.originalUrl;
        req.flash('error', ('please login first'))
        return res.redirect('/login')
    }
    next();
};


module.exports.saveRedirectURl = (req, res, next) => {
    if (req.session.redirectURL) {
        res.locals.redirectURL = req.session.redirectURL;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let editData = await listing.findById(id);
    if (!editData.owner._id.equals(res.locals.currUser._id)) {
        req.flash('error', "you don`t have permession to edit this data")
        return res.redirect(`/listings/${id}`)
    }
    next();
}

// review author 
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let reviewData = await reviews.findById(reviewId);
    if (!reviewData.author._id.equals(res.locals.currUser._id)) {
        req.flash('error', "you don`t have permession to edit this reviews")
        return res.redirect(`/listings/${id}`)
    }
    next();
}

module.exports.ValidateDataByJoi = (req, res, next) => {
    let { error } = listingsSchema.validate(req.body);

    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

module.exports.validationForReviews = (req, res, next) => {
    let { error } = reviewsSchema.validate(req.body);

    if (error) {
        throw new ExpressError(400, error)
    }
    else {
        next();

    }

}

