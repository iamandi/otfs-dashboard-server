"use strict";
const express = require("express");
const app = express();

const logger = require("./startup/logging");
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 5001;
app.listen(port, () => logger.info(`Listening on ${port}...`));
