const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const configs = require("../config_project");

app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect(
    configs.mongooseURL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.listen(4100);