const express = require("express");
const Router = express.Router();
const deleteContentController = require("../controller/deleteContentController");

Router.delete("/api/v1/delete/content/:id", deleteContentController.delete);

module.exports = Router;