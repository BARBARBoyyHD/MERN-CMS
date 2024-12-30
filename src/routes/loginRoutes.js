const express = require("express");
const Router = express.Router();
const loginController = require("../controller/loginController");

Router.post("/api/v1/login", loginController.login);

module.exports = Router;