const express = require("express");
const Router = express.Router();
const getContentController = require("../controller/getContentController");

Router.get("/api/v1/get/content/:id", getContentController.single);

module.exports = Router;