const express = require("express");
const peliculasRouter = require("./routes/peliculas");

const app = express();
app.use(express.json());
app.use("/peliculas", peliculasRouter);

module.exports = app;
