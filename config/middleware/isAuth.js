// function that redirects the user if they are not logged in
function isAuthenticated (req, res, next) {
    if(req.user) {
        return next();
    }

    // if the authentication fails, redirect the user to the login page
    return res.redirect("/")
}

module.exports = {isAuthenticated};