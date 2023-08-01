const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('../json/db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

server.use(cors());
server.use(middlewares);
server.use(router);

const puerto = 3000;

server.listen(puerto, () => {
  console.log(`JSON Server está en funcionamiento en el puerto ${puerto}`);
});
