const User = require("../models/userData");
const Tag = require('../models/tagData')
const Img = require('../models/imgData')
const Helpers = require("../util/Helpers");
const fs = require("fs");
const path = require("path");
// res.locals work like $_SESSION['name']....

// Home controller

exports.index = (req, res, next) => {
  res.locals.user[0].map((el) => {
    // console.log(el);
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
  //to work with ......
  // update all input in our db ...
  // check if it's exists in db
  var dataErr = {};
  dataErr.input = { ...res.locals.input };
  // console.log("test params : " + req.body.userName + " " + req.body.email + " " + req.body.firstName + " " + req.body.lastName + " " + req.body.bio);
  res.locals.user[0].map(async (el) => {
    var id = el.id,
      email = req.body.email,
      userName = req.body.userName,
      first = req.body.firstName,
      last = req.body.lastName,
      bio = req.body.bio,
      oldP = req.body.passworde,
      psText;
    // console.log(id + "  " + email + "  " + userName + "  " + first + "  " + last + "  " + bio + "  " + oldP);
    try {
      await User.UserIdModel(id).then(([user]) => {
        user.map((el) => (psText = el.password));
      });
      if (Helpers.cmpBcypt(oldP, psText)) {
        // Update all information comming from a request
      } else dataErr.msg = "Enter your old password";
      res.json(dataErr);
    } catch (error) {
      console.log(error);
    }
  });
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

exports.fillImg = async (req, res, next) => {
  // **************************************************
  // need some validator in the validator file.
  ///////////////////////////////////// Images : //////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  //save in db
  // base 64 doesn't work in mac
  // var images = [];
  // await req.files.map((el) => {
  //   // const { originalname, path } = el
  //   const path = base64Img.base64Sync(el.path)
  //   images.push({ name: el.originalname, path: path });
  // });
  // // console.log(images);
  // res.json(images);
  // res.json(req.files)

  // try {
  //   return res.status(201).json({
  //     message: "File uploded successfully",
  //   });
  // } catch (error) {
  //   console.error(error);
  // }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  var dataErr = {},
    data = {},
  data = { ...req.body }
  data.id = req.params.id
    dataErr.status = false
  if (Object.keys(req.files).length !== 0) {
    req.files.map((el, iKey) => {
      const img = new Img(
        null,
        data.id,
        'public/upload/' + el.filename,
        iKey > 0 ? 0 : 1
      )
      img.save()
    })
    dataErr.msgImg = 'upload done correctly'
    dataErr.status = true
  } else dataErr.msgImg = 'No Images uploaded'
  res.json(dataErr)
}

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