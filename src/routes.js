const express = require("express");

const routes = express.Router();

const PartnerController = require("./controllers/PartnerController");

routes.get("/partners", PartnerController.index);
routes.post("/partners", PartnerController.store);

module.exports = routes;