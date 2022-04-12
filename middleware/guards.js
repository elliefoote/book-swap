const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");


/**
 * Guards are middleware that "protect" routes.
 **/


/**
 * Make sure the user is logged in
 **/

function ensureUserLoggedIn(req, res, next) {
    let token = _getToken(req);
    try {
        // Throws error on invalid/missing token
        jwt.verify(token, SECRET_KEY);
        // If we get here, a valid token was passed
        next();
    } catch (err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}

// Ensure user is admin

function ensureUserIsAdmin(req, res, next) {
    let token = _getToken(req);
    try {
        // Throws error on invalid/missing token
        let payload = jwt.verify(token, SECRET_KEY);
        // If we get here, a valid token was passed
        if (payload.usertype === "admin") {
            next();
        } else {
            res.status(401).send({ error: 'Unauthorized' });
        }
    } catch (err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}

/**
 * Make sure user is logged in and is accessing his/her own page.
 * i.e. userId in token === userId in URL param
 **/

function ensureSameUser(req, res, next) {
    let token = _getToken(req);
    try {
        // Throws error on invalid/missing token
        let payload = jwt.verify(token, SECRET_KEY);
        console.log(payload.userid)
        // If we get here, a valid token was passed
        if (payload.userid === Number(req.params.userid)) {
            next();
        } else {
            res.status(401).send({ error: 'Unauthorized' });
        }
    } catch (err) {
        res.status(401).send({ error: 'Unauthorized' });
    }
}


/**
 * Return the JWT token if found, else return ''
 * Authorization header string looks like: "Bearer <token>"
 **/

function _getToken(req) {
    // Return '' if header not found
    if ( !('authorization' in req.headers) ) {
        return '';
    }

    // Split header into 'Bearer' and token
    let authHeader = req.headers['authorization'];
    let [str, token] = authHeader.split(' ');

    return (str === 'Bearer') ? token : '';
}


module.exports = {
    ensureUserLoggedIn,
    ensureSameUser,
    ensureUserIsAdmin
};