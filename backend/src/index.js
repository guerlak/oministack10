const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect(
    "mongodb+srv://oministack:aloha99@cluster0-p5wzr.mongodb.net/omini10?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.listen(4100);