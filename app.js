// import env 
if (process.env.NOD_ENV != "production") {
    require('dotenv').config();
}


const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const methodOverride = require('method-override')
const ejs_mate = require('ejs-mate')
var session = require('express-session')
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
let User = require('./models/user.js');
const MongoStore = require('connect-mongo');

// routes 
const listingRoute = require('./routes/listing.js');
const reviewsRoute = require('./routes/reviews.js');
const userRoute = require('./routes/userRoute.js');

// models 
const user = require('./models/user.js');

// varibales 
const app = express();
const port = 3000;
const MongoUrl = process.env.ATLAS_USER_DB;

// connection setup 
main().then((res) => {
    console.log("DataBase connected!")
}).catch((err) => {
    console.log(err)
});
async function main() {
    await mongoose.connect(MongoUrl)
};


// sessions 
const store = MongoStore.create({
    mongoUrl: MongoUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
})
store.on('error', () => {
    console.log('Error in Mongo Session store')
})
const sessionOPtion = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}



// app settings 
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');
app.engine('ejs', ejs_mate);

// app use
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/Public')));
// sesstion 
app.use(session(sessionOPtion))
app.use(flash())


// passport initialize (middle ware for all rourte to check login)
app.use(passport.initialize())
app.use(passport.session()) // the user will be login once

// creating passport local strategie
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware 
app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.currUser = req.user;
    next();
})


app.use('/listings', listingRoute)
app.use('/listings/:id/reviews', reviewsRoute)
app.use('/', userRoute)


app.get('/', (req, res) => {
    res.redirect('/listings')
})
app.get('/map', (req, res) => {
    res.render('listings/map.ejs')
})
// 404 
app.all('*', (req, res) => {
    res.status(404).render('listings/notfound.ejs')
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went Wrong!" } = err;
    res.status(statusCode).render('listings/error.ejs', { err })
})

app.listen(port, () => console.log(`index app listening on port ${port}!`));



