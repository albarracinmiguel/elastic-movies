const app = require("./src/app");
const { initIndex } = require("./src/services/elastic");

const PORT = process.env.PORT || 3000;

async function start() {
  await initIndex();
  app.listen(PORT, () => {
    console.log(`listening port http://localhost:${PORT}`);
  });
}

start();
