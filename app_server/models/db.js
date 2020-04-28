const mongoose = require('mongoose');
const readLine = require('readline');

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

// Creating a conecction
const dbURI = 'mongodb://localhost/Loc8r';
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