const express = require('express');
var cookieParser = require('cookie-parser');
const multer = require('multer');

const Router = express.Router({ mergeParams: true });
const app = express();

// modules 
const wrapAsynch = require('../utility/wrapAsynch.js');
const { isLoggedIn, isOwner, ValidateDataByJoi } = require('../middleware.js')

// model 
const listingController = require('../controller/listing.js');
Router.use(cookieParser("secretCode"));

// destination for new file that are uploaded 
const { storage } = require('../cloudConfig.js') // storage at cloudinery
const upload = multer({ storage }); //=> multer need a des that we define as storage 

// controllers 
Router.route('/')
    .get(wrapAsynch(listingController.index))
    .post(
        isLoggedIn,
        upload.single('data[img]'),
        ValidateDataByJoi,
        wrapAsynch(listingController.postNewPage)
    );

Router.get('/new', isLoggedIn, listingController.renderNewPage);

Router.route('/:id')
    .get(wrapAsynch(listingController.showPage))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('data[img]'),
        ValidateDataByJoi,
        wrapAsynch(listingController.updateEditPage))
    .delete(isLoggedIn, wrapAsynch(listingController.deleteListings));



Router.get('/:id/edit', isLoggedIn, isOwner, wrapAsynch(listingController.renderEditPage));

app.use('/listings', Router);
module.exports = Router;