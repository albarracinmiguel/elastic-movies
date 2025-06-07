const express = require("express");
const moviesRouter = require("./routes/movies");

const app = express();
app.use(express.json());
app.use("/movies", moviesRouter);

module.exports = app;
