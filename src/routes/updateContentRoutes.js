const express = require("express");
const Router = express.Router();
const updateContentController = require("../controller/updateContentController");

Router.put("/api/v1/update/content/:id", updateContentController.update);

module.exports = Router;