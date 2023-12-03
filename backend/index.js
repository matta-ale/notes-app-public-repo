//acá conecto sequelize con el server
const server = require("./src/app.js");
const { conn, Note, User } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: false, alter: false }).then(async () => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});

//sync es una promesa, en el then levanto el server
