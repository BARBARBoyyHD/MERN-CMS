const express = require("express");
const Router = express.Router();
const addContentController = require("../controller/addContentController");

Router.post("/api/v1/create/content", addContentController.create);

module.exports = Router;