const User = require("../models/user");

module.exports.signupRender = (req, res) => {
    res.render('listings/signup.ejs')
};
module.exports.singupRequest = async (req, res) => {
    try {
        let { username, password, email } = req.body;
        let newUser = new User({
            username,
            email
        });
        const registerUser = await User.register(newUser, password);
        req.flash('success', 'welcome to ctrlbuy :)')
        console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                next(err);
            }
            req.flash('success', 'welcome you are loged in')
            res.redirect('/listings');
        })
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/signup')
    }
};
module.exports.loginRender = (req, res) => {
    res.render('listings/login.ejs')
};
module.exports.loginRequest = async (req, res) => {
    req.flash('success', 'welcome you are loged in');
    res.redirect(res.locals.redirectURL);

};
module.exports.logoutRequest = (req, res) => {
    req.logOut((err) => {
        if (err) {
            next(err)
        }
        req.flash('success', 'you are logout');
        res.redirect('/listings')
    })
}