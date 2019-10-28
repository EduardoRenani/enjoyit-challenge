const express = require('express');
const mongoose = require("mongoose");
var cors = require('cors');

const app = express();

// const server = require("http").Server(app);
// const io = require("socket.io")(server);

mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((req, res, next) => {
    // req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(require("./routes"));

module.exports = app