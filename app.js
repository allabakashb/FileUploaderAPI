const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const util = require('util');


const app = express();
const appPort = 8000;

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(compression());

const startServer = () => {
    app.listen(appPort);
    require("./app/routing")(app);
    util.log("App listening on port " + appPort);
};

startServer();
