const express = require("express");
const Router = express.Router();
const showContentController = require("../controller/showContentController");

Router.get("/api/v1/show/content", showContentController.show);

module.exports = Router;