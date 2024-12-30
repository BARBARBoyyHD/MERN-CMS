const express = require("express");
const Router = express.Router();    
const registerUser = require("../controller/registerUserController");

Router.post("/api/v1/register/user",registerUser.register)

module.exports = Router