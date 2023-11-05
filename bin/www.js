var app = require('../app');
var debug = require('debug')('server:server');
var http = require('http');
const socketIO = require('socket.io');
const logger = require('morgan');
const mongoose = require('mongoose')
require('dotenv').config();


var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

const connect = async () => {
  await mongoose.connect(process.env.MONGOOSE_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(data => {
    console.log("Connected to MongoDB");
  }).catch(err => console.error("Error connecting to MongoDB:", err))
}
var port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

server.listen(port,
  async () => {
    await connect()
    console.log(`Server is on port: ${port}`)
  });
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

