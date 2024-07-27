const listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res, next) => {
    let contants = await listing.find({});
    res.render('listings/index.ejs', { contants });
}

module.exports.renderNewPage = (req, res) => {
    res.render('listings/new.ejs');
}
module.exports.showPage = async (req, res) => {
    let { id } = req.params;
    let data = await listing.findById(id).populate(
        {
            path: 'reviews',
            populate: { path: 'author' }
        }).populate('owner');
    if (!data) {
        req.flash('error', ('product you request dosen`t exsist!'))
        res.redirect('/listings')
    }
    // console.log(data)
    res.render('listings/show.ejs', { data });
};
module.exports.postNewPage = async (req, res, next) => {
    let city = req.body.data.location;
    let country = req.body.data.country;
    let location = `${city},${country}`;

    console.log(location)
    let response = await geocodingClient.forwardGeocode({
        query: location,
        limit: 1
    }).send();

    console.log(response.body.features[0].geometry);
    let url = req.file.path;
    let filename = req.file.filename;

    const newData = new listing(req.body.data);
    newData.owner = req.user._id;
    newData.img = { url, filename }
    newData.geometry = response.body.features[0].geometry;
    let savedData = await newData.save();
    console.log(savedData)
    req.flash("success", 'new product is added')
    res.redirect('/listings');
};


module.exports.renderEditPage = async (req, res) => {
    let { id } = req.params;
    let data = await listing.findById(id);
    if (!data) {
        req.flash('error', ('product you request dosen`t exsist!'))
        res.redirect('/listings')
    }
    let orignalImgURL = data.img.url;
    let newimgURL = orignalImgURL.replace('/upload', "/upload/c_fill,h_200")
    res.render('listings/edit.ejs', { data, newimgURL });
};


module.exports.updateEditPage = async (req, res) => {
    let { id } = req.params;
    let newData = await listing.findByIdAndUpdate(id, { ...req.body.data });


    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        newData.img = { url, filename };
        await newData.save();
    }
    // update cordinates 
    let city = req.body.data.location;
    let country = req.body.data.country;
    let location = `${city},${country}`;

    let response = await geocodingClient.forwardGeocode({
        query: location,
        limit: 1
    }).send();

    newData.geometry = response.body.features[0].geometry;
    await newData.save();

    req.flash("success", 'Product is Updated')
    res.redirect('/listings');
};


module.exports.deleteListings = async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", 'Product is deleted')
    res.redirect('/listings');
}