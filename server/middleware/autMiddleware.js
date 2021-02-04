const jwt = require('jsonwebtoken');
const User = require('../models/userData');
// CheckAuth require

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err){
                next();
            }else{
                next();
            }
        })
    }else{
        res.send("login")
    }
}

// Check if user already exist ...

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                console.log('ahya 1 !!!!')
                res.locals.user = null;
                next();
            }else{
                console.log('user kayn f db a sir ....')
                let user = await User.UserIdModel(decodedToken.id)
                res.locals.user = user
                console.log(res.locals.user);
                next()
            }
        })
    }else{
        console.log('ahya 2 !!!!')
        res.locals.user = null
        next()
    }
}