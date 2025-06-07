const express = require('express');

module.exports = function createApp(client) {
  const app = express();
  app.use(express.json());

  app.post('/movies', async (req, res) => {
    try {
      const { body } = await client.index({
        index: 'movies',
        document: req.body,
      });
      res.status(201).json({ result: body.result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/movies/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = await client.get({ index: 'movies', id });
      res.json(body._source);
    } catch (err) {
      res.status(404).json({ error: 'Not Found' });
    }
  });

  app.get('/search', async (req, res) => {
    try {
      const { q } = req.query;
      const { body } = await client.search({
        index: 'movies',
        query: { match: { title: q } }
      });
      res.json(body.hits.hits.map(hit => ({ id: hit._id, ...hit._source })));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return app;
};
