const { Client } = require('@elastic/elasticsearch');
const createApp = require('./app');

const client = new Client({ node: process.env.ELASTIC_NODE || 'http://localhost:9200' });
const app = createApp(client);
const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
