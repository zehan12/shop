const server = require("./app");
const config = require("./config/config");

const port = config.port;

server.listen(port, () => {
  console.log(`
    ################################################
    🚀 Server listening on port: ${port} 🚀
    ################################################
`);
});
