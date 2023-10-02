const mongoose = require('mongoose');
const config = require("./config/config");
const logger = require("./config/logger");
const app = require("./app")

let server;

mongoose.connect(config.mongoose.url).then(() => {
  logger.info("Connected to MongoDB")
  app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
  });
})

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});


