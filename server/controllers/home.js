const User = require("../models/userData");
const Tag = require('../models/tagData')
const Img = require('../models/imgData')
const Geo = require('../models/geoData')
const Helpers = require("../util/Helpers");
const fs = require("fs");
const path = require("path");
// res.locals work like $_SESSION['name']....

// Home controller

exports.index = (req, res, next) => {
  res.locals.user[0].map((el) => {
    console.log(res.locals.user[0]);
    res.json(res.locals.user[0]);
  });
};

// edit information if user want that

exports.edit = async (req, res, next) => {
  var data = {},
    toSend = {};
  toSend.input = { ...res.locals.input };
  data = { ...req.body };
  data.id = req.params.id;

  if (Object.keys(toSend.input).length !== 0) res.json(toSend);
  else {
    await User.UpdateFirstInfo(data).then(([res]) => {
      if (res.affectedRows === 1) {
        toSend.status = true;
      } else toSend.status = false;
    });
    res.json(toSend);
  }
};

// edit password

exports.editPassword = (req, res) => {
  var dataErr = {};
  dataErr.input = { ...res.locals.input };
  res.locals.user[0].map(async (el) => {
    var id = el.id,
      oldP = req.body.password,
      newP = req.body.newPassword,
      cnfP = req.body.cnfrmPassword,
      psText;
    try {
      await User.UserIdModel(id).then(([user]) => {
        user.map((el) => (psText = el.password));
      });
      if (Helpers.cmpBcypt(oldP, psText)) {
        if (newP === cnfP) {
          if (!Helpers.cmpBcypt(newP, psText)) {
            User.UserForgetPassword_(Helpers.keyBcypt(newP), id).then(
              (dataErr.msg = "Password Changed.")
            );
          } else dataErr.msg = "Enter a new password";
        } else dataErr.msg = "Confirm Your password";
      } else dataErr.msg = "Enter your old password";
      res.json(dataErr);
    } catch (error) {
      console.log(error);
    }
  });
};

// edit profil

exports.editProfil = (req, res) => {
  var dataErr = {},
    data = {},
    toSend = {}
  toSend.input = { ...res.locals.input }
  data = { ...req.body }
  data.id = req.params.id
  dataErr.status = false

  if (Object.keys(toSend.input).length !== 0) res.json(toSend)
  else{
    User.UpdateProfilInfo(data);
    dataErr.status = true
    res.json(dataErr);
  }
};

// Fill profil with help of id just for test

exports.fillProfil = async (req, res, next) => {
  var dataErr = {},
    data = {},
    toSend = {};
  toSend.input = { ...res.locals.input }
  data = { ...req.body }
  data.id = req.params.id
  
  if (Object.keys(toSend.input).length !== 0) res.json(toSend)
  else{
    try {
      await User.UserIdModel(data.id).then(([user]) => {
        if (user.length) {
          User.fillProfilUpdate(data).then(([UpRes]) => {
            if (UpRes.affectedRows) dataErr.status = true
            else dataErr.msg = 'Nothing changed'
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
    data.tag.map((el) => {
      Tag.tagExists(el.name).then(([tagRes]) => {
        if (!tagRes.length) {
          const tag = new Tag(null, el.name)
          tag.save().then(() => {
            Tag.tagExists(el.name).then((res) => {
              res[0].map((id) => {
                Tag.insertInTagUser(data.id, id.id)
              })
            })
          })
        } else {
          Tag.tagIdModel(data.id, el.name).then(([userTag]) => {
            if (!userTag.length) {
              Tag.tagExists(el.name).then((res) => {
                res[0].map((id) => {
                  Tag.insertInTagUser(data.id, id.id)
                })
              })
            }
          })
          dataErr.msgTag = 'Already exists'
        }
      })
    })
    res.json({dataErr, status: true})
  }
};

// exports.fillImg = async (req, res, next) => {
//   const {data} = {...res.locals}
//   if(data.errors == "" && data.index != "undefined")
//   {
//     console.log('data', data);
//     console.log('res.locals', {...res.locals})
//     // new Img(data.)
//     // var ret = Img.save();
//   }
//   else {
//   }
//   res.json('abc')
// }

exports.tags = async (req, res) => {
  var data = {};
  await Tag.getAllTag(req.params.id).then(([res]) => {
    data = res.map((el, iKey) => {
      return { key: iKey, name: el.name };
    });
  });
  res.json(data);
};

exports.getImges = (req, res) => {
  const uploadDerictory = path.join("public/upload");
  console.log(uploadDerictory);
  fs.readdir(uploadDerictory, (err, files) => {
    console.log(files);
    if (err) {
      res.json({ msg: err });
      //   console.log(err)
    } else if (files.length === 0) {
      res.json({ msg: "No Images uploaded" });
    }
    return res.json({ files });
    // console.log(file)
  });
};


exports.checkIs = (req, res) => {
  User.CheckIfE(req.params.id).then(([is]) => {
    if (is.length) {
      res.json({ status: true })
    }else
      res.json({ status: false })
  })
}

exports.geo = async (req, res) => {
  var data = {},
    data = { ...req.body }
  data.id = req.params.id
  // const { lat, long } = req.body;
  let word, lat, long
  // res.json(Helpers.geoLocal(lat, long));
  await Helpers.geoLocal(data.lat, data.long).then(city => {
    city.map(el => {
      word = el.city.split(' ')
      // insert into info geo user into db 
      const geo = new Geo(null, data.id, word[0], data.lat, data.long)
      geo.save();
    })
  })
  res.json(word[0])
}


exports.multerUpload = 
    (req, res, next) => {

      Helpers.upload(req, res, (err) => {
      const go = async () => {
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
              console.log('req.file', req.file.filename)
              data.msg = "File Uploaded!"
             
              data.errors = "";
              data.index = req.body.index;
              image = new Img(null, req.body.userId, req.file.filename, req.body.index)
              await image.save()
              // res.json( {
                //   msg: 'File Uploaded!', req: req.file
                //   // file: `uploads/${req.file.filename}`
                // });
              }
        }
            data.userId = req.body.userId
            res.json({data: data})
            res.locals.data = data;
            next();
            console.log('here', data)
          }
          go();
          }
          )
  }