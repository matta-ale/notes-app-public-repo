const { User } = require('../../db');
const Sequelize = require('sequelize');
const CustomError = require('../../utils/customError');
const { hashPassword } = require('../../utils/passwordHasher');

const createUserHandler = async (data) => {
  const { username, password } = data;

  try {
    const hashedPassword = await hashPassword(password);
    const foundUser = await User.findOne({ where: { username } });
    data = { ...data, password: hashedPassword };
    if (foundUser) {
      throw new CustomError(
        'Customer already registered with that username',
        409
      );
    } else {
      const created = await User.create(data);
      return created;
    }
  } catch (error) {
    if (error instanceof CustomError) {
      throw new CustomError(error.message, error.statusCode);
    } else {
      throw new CustomError(error.message, 500);
    }
  }
};

module.exports = createUserHandler;
