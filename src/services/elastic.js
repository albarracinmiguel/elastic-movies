const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

const elasticClient = new Client({
  node: process.env.ELASTICSEARCH_NODE,
});

const index = "movies";

async function initIndex() {
  const exists = await elasticClient.indices.exists({ index });

  if (!exists) {
    await elasticClient.indices.create({
      index,
      mappings: {
        properties: {
          titulo: { type: "text" },
          director: { type: "text" },
          generos: { type: "text" },
          anio: { type: "integer" },
          sinopsis: { type: "text" },
          puntuacion: { type: "float" },
        },
      },
    });
    console.log(`Índice '${index}' creado.`);
  } else {
    console.log(`Índice '${index}' ya existe.`);
  }
}

async function indexMovie(pelicula) {
  const result = await elasticClient.index({
    index,
    body: pelicula,
  });
  return result;
}

async function searchMovies(query) {
  const result = await elasticClient.search({
    index,
    query: {
      query_string: {
        query: `*${query}*`,
        fields: ["titulo", "director", "sinopsis", "generos"],
        default_operator: "AND",
      },
    },
  });

  return result.hits?.hits?.map((hit) => hit._source) || [];
}

module.exports = {
  elasticClient,
  initIndex,
  indexMovie,
  searchMovies,
};
