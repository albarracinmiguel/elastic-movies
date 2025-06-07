const express = require("express");
const router = express.Router();
const { indexMovie, searchMovies } = require("../services/elastic");

router.post("/", async (req, res) => {
  try {
    const result = await indexMovie(req.body);
    res.status(201).json({ mensaje: "Película indexada", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const query = req.query.q || "";
    const resultados = await searchMovies(query);
    res.json(resultados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
