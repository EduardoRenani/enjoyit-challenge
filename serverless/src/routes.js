const express = require("express");

const routes = express.Router();

const PartnerController = require("./controllers/PartnerController");

routes.get("/partners", PartnerController.index);
routes.post("/partners", PartnerController.store);
routes.delete("/partners", PartnerController.empty);

module.exports = routes;