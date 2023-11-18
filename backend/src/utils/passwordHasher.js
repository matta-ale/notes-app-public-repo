const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });
};

const comparePassword = (enteredPassword, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(enteredPassword, hashedPassword, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
module.exports = { hashPassword, comparePassword };
