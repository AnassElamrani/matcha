const jwt = require('jsonwebtoken');
const User = require('../models/userData');
const { rawListeners } = require('../util/database');
// CheckAuth require

exports.requireAuth = (req, res, next) => {
    // console.log('*********')
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err){
                console.log('1')
                res.json({access:"denied", msg: "Protected Route - You Must Loggin To Access This Route !"})
                // console.log('ss')
                // next();
                // res.send("Protected Route - You Must Loggin To Access This Route !")
            }else{
                // console.log('2')
                // res.send(req.cookies);
                res.json({access:"Granted", jwt: req.cookies.jwt, msg: "User Allowed"})
                next();
            }
        })
    }else{
        console.log(2)
        res.json({access:"denied", msg: "Protected Route - You Must Loggin To Access This Route !"})
    }
}

// Check if user already exist ...

exports.getUserInfos = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            }else{
                let user = await User.UserIdModel(decodedToken.id)
                if(user[0].length != 0)
                {
                    console.log('ssssss')
                    let infos = user[0][0]
                    if(infos.length != 0){
                        res.json({user: infos})
                    }

                }
                else    // res.locals.user = infos
                {
                    console.log('zzzzz')
                    let oUser = await User.UserAuthIdModel(decodedToken.id)
                    // console.log(oUser)
                    // throw(1122121)

                    let oInfos = oUser[0][0]
                    if(oInfos.length != 0){
                        // res.locals.user = infos
                        res.json({user: oInfos})
                    }
                    // res.json({})
                }
                // console.log();
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}