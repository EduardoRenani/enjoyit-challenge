const express = require('express');
const mongoose = require("mongoose");
var cors = require('cors')


const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect("mongodb://enjoy:enjoyit1@ds333248.mlab.com:33248/enjoyit-challenge",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(require("./routes"));

var port = process.env.PORT || 8080;

server.listen(3000, () => {
    console.log("Server started on port 3000...");
});

module.exports = server