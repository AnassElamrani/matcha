const jwt = require('jsonwebtoken');
const User = require('../models/userData');
// CheckAuth require

exports.requireAuth = (req, res, next) => {
    console.log('*********')
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
                console.log('2')
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
    console.log('checkUser');
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                console.log('ahya 1 !!!!')
                res.locals.user = null;
                next();
            }else{
                console.log('user kayn f db a sir ....')
                // console.log('object', user++ )
                // if(user === '0')
                // {
                //     console.log('decodedToken', decodedToken)
                await User.UserIdModel(decodedToken.id).then((res) => {
                    console.log('res', res);
                })
                
                // }
                    // console.log('res', {...res})
                // })
                // res.locals.user = user[0]
                // console.log(user)
                // console.log('ss',res.locals.user);
                next()
            }
        })
    }else{
        console.log('ahya 2 !!!!')
        res.locals.user = null
        next()
    }
}