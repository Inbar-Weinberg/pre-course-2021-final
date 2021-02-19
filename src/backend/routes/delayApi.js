const express = require("express");
const fs = require("fs");
const delayRouter = express.Router();

delayRouter.use(express.json());
delayRouter.use((req, res, next) => setTimeout(next, 1000));


module.exports = delayRouter;