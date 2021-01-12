const homeController = require("../controllers/home");
const validator = require("../controllers/validator");
const authVrfy = require("../middleware/autMiddleware");

const express = require("express");
const route = express.Router();

// Get home [page]

route.get("/base", authVrfy.requireAuth, homeController.index);

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
  "/base/editprofil",
  authVrfy.requireAuth,
  validator.validationInput,
  homeController.editProfil
);

// post fill profil

route.post(
  "/base/profil/:id",
  // authVrfy.requireAuth,
  validator.validationInput,
  homeController.fillProfil
);

// get all tags


route.post(
  "/base/tag/",
  homeController.tags
)
module.exports = route;
