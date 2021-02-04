const homeController = require("../controllers/home");
const validator = require("../controllers/validator");
const authVrfy = require("../middleware/autMiddleware");
const Helpers = require("../util/Helpers");
var multer = require('multer')

const express = require("express");
const route = express.Router();

// Get home [page]

route.get("/base", authVrfy.requireAuth, authVrfy.checkUser, homeController.index);

//continue with this part

route.post(
  "/base/edit/:id",
  authVrfy.requireAuth,
  validator.validationInput,
  homeController.edit
);

//  edit password logged POST

route.post(
  "/base/editpassword/",
  authVrfy.requireAuth,
  validator.validationInput,
  homeController.editPassword
);

//  edit profil logged POST

route.post(
  "/base/editprofil/:id",
  validator.validationInput,
  homeController.editProfil
);

// post fill profil
// for uploading multiple images
// multiple images upload.array('images', 100)
// single images
// upload.single("myImage")

route.post(
  "/base/profil/:id",
  validator.validationInput,
  homeController.fillProfil
);

// add img

// route.post(
//   '/base/img/:id',
//   [Helpers.upload.array('myImage', 5)],
//   homeController.fillImg
// )
route.post(
  '/base/img/:id', (req, res, next) => {
    Helpers.upload(req, res, (err) => {
      // console.log('formData', req.body.index);
      const data = {};
      // console.log('2', {...req.file})
      if(err){
        data.msg = "Error Has Occured";
        data.errors = err;
        // console.log('error:' ,err)
        // res.json({
        //   msg: err
        // });
      } else {
        if(req.file == undefined){
          // res.json({
          //   msg: 'Error: No File Selected!'
          // });
          data.msg = "No File Selected!"
          data.errors = "";
          
        } else {
          data.msg = "File Uploaded!"
          data.errors = "";
          data.index = req.body.index;
          // res.json( {
            //   msg: 'File Uploaded!', req: req.file
            //   // file: `uploads/${req.file.filename}`
            // });
          }
        }
        data.userId = req.body.userId
        res.locals.data = data;
        next();
      console.log('here', data)
    }
    )
    
}, homeController.fillImg)
// get all tags [POST]

route.post("/base/tag/:id", homeController.tags);

// get all images

route.get("/upload/:filename", homeController.getImges)

// check if profil is complet

route.post('/base/check/:id', homeController.checkIs)

// localistation

route.post('/base/localisation/:id', homeController.geo)


module.exports = route;