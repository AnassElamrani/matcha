const User = require("../models/userData");
const Tag = require("../models/tagData");
const Helpers = require("../util/Helpers");

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
  // To work with image ********************************
  // console.log(req.file);
  // res.set('Content-Type', 'image/png');
  // res.send('<img src=${req.file.path} width="500"></img>');
  // **************************************************
  // need some validator in the validator file.
  var dataErr = {},
    data = {};
  data = { ...req.body };
  data.id = req.params.id;
  let idTag;
  try {
    await User.UserIdModel(data.id).then(([user]) => {
      if (user.length) {
        User.fillProfilUpdate(data).then(([UpRes]) => {
          if (UpRes.affectedRows) dataErr.status = true;
          else dataErr.msg = "Nothing changed";
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
  try {
    await Tag.tagExists(data.tag).then(([tagRes]) => {
      tagRes.map((el) => {
        idTag = el.id;
      });
    });
  } catch (error) {
    console.log(error);
  }
  if (data.tag.charAt(0) === "#") {
    Tag.tagExists(data.tag).then(([tagRes]) => {
      if (!tagRes.length) {
        const tag = new Tag(null, data.tag);
        tag.save().then(() => {
          Tag.getLastOne().then(([last]) => {
            last.map((el) => {
              Tag.cmpIdTag(el.id).then(([exTag]) => {
                !exTag.length ? Tag.insertInTagUser(data.id, el.id) : "";
              });
            });
          });
        });
      } else {
        Tag.tagIdModel(data.id, data.tag).then(([userTag]) => {
          if (!userTag.length)
            Tag.getLastOne().then(([last]) => {
              last.map((el) => {
                Tag.cmpIdTag(el.id).then(([exTag]) => {
                  !exTag.length ? Tag.insertInTagUser(data.id, el.id) : "";
                })
              });
            });
        });
        dataErr.msgTag = "Already exists";
      }
    });
  }
  res.json(dataErr);
};

exports.tags = async (req, res) => {
  var data = {}
  await Tag.getAllTag().then(([res]) => {
    // data[i] = res
    data = res.map((el) => {
        return {"name":el.name}
      })
  })
  res.json(data)
}