const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// importo los archivos routers
const usersRouter = require("./routes/usersRouter");
const notesRouter = require("./routes/notesRouter");


const server = express();
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//declaro los middlewares con los archivos routers
server.use("/", usersRouter);
server.use("/", notesRouter);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
