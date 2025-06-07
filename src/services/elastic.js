const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

const elasticClient = new Client({
  node: process.env.ELASTICSEARCH_NODE,
});

const index = "movies";

async function initIndex() {
  const exists = await elasticClient.indices.exists({ index });
  if (!exists.body) {
    await elasticClient.indices.create({
      index,
      body: {
        mappings: {
          properties: {
            titulo: { type: "text" },
            director: { type: "text" },
            generos: { type: "keyword" },
            anio: { type: "integer" },
            sinopsis: { type: "text" },
            puntuacion: { type: "float" },
          },
        },
      },
    });
  }
}

async function indexPelicula(pelicula) {
  const result = await elasticClient.index({
    index,
    body: pelicula,
  });
  return result;
}

async function buscarPeliculas(query) {
  const result = await elasticClient.search({
    index,
    body: {
      query: {
        multi_match: {
          query,
          fields: ["titulo", "director", "sinopsis"],
        },
      },
    },
  });

  return result.body.hits.hits.map((hit) => hit._source);
}

module.exports = {
  elasticClient,
  initIndex,
  indexPelicula,
  buscarPeliculas,
};
