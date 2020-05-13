const mongoose = require('mongoose');
const readLine = require('readline');
require('./locations');

// Creating a conecction
let a = (process.env.NODE_ENV)
let b = (process.env.MONGODB_URI)

console.log(a)
console.log(b)

let dbURI = b;

if (a === undefined) {
  dbURI = "mongodb://bruno.ruas:conecta135@10.10.5.41/Loc8r";
}

// Fixing the DeprecationWarning about collection.ensureIndex
mongoose.set('useCreateIndex', true);

// Connecting
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

// Monitors for a successful connection through Mongoose
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`)
});

// Checks for a connection error
mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error:`, err)
});

// Checks for a disconnection event
mongoose.connection.on('disconnected', () => {
  console.log(`Mongoose disconnected`)
});


// Listening for SIGINT to monitor whan the aplication stops
// npm start
if (process.platform === 'win32') {
  const rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stout
  });
  rl.on ('SIGINT', () => {
    process.emit ("SIGINT");
  });
}
// nodemon
if (process.platform === 'win32') {
  const rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stout
  });
  rl.on ('SIGUSR2', () => {
    process.emit ("SIGUSR2");
  });
}
// heroku local
if (process.platform === 'win32') {
  const rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stout
  });
  rl.on ('SIGTERM', () => {
    process.emit ("SIGTERM");
  });
}

// Capturing the process termination events
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  })
}

// Nodemon
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// NPM start
process.once('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

// Heroku
process.once('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});