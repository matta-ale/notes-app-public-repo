const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// importo los archivos routers
// const paymentsRouter = require("./routes/pay/paymentsRouter");
// const customersRouter = require("./routes/customers/customersRouter.js");
// const vehiclesRouter = require("./routes/vehicles/vehiclesRouter.js");
// const bookingsRouter = require("./routes/bookings/bookingsRouter.js");
// const locationsRouter = require("./routes/locations/locationsRouter.js");
// const mercadoPagoRouter = require("./routes/mercadoPagoRouter");
// const sendEmailRouter = require("./routes/sendEmailRouter");
// const reviewsRouter = require("./routes/review/reviewsRouter");
// const usersRouter = require("../src/routes/users/usersRouter");


const server = express();
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//declaro los middlewares con los archivos routers
// server.use("/", paymentsRouter);
// server.use("/", customersRouter);
// server.use("/", vehiclesRouter);
// server.use("/", bookingsRouter);
// server.use("/", locationsRouter);
// server.use("/", mercadoPagoRouter);
// server.use("/", sendEmailRouter);
// server.use("/", reviewsRouter);
// server.use("/", usersRouter);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
