const app = require("./app");
const config = require("./config/config");
const connectDatabase = require("./config/database");

const port = config.port;

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception.`);
});

// connectDatabase();

const server = app.listen(port, () => {
  console.log(`
    ################################################
    🚀 Server listening on port: ${port} 🚀
    ################################################
`);
});

// unhandled promise rejection 
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection.`);

  server.close(() => {
    process.exit(1);
  });
});
