const { User } = require('../../db');
const CustomError = require('../../utils/customError');
const { comparePassword } = require('../../utils/passwordHasher');

const attemptLoginHandler = async (username, password) => {
  try {
    const user = await User.findOne({
      where: {username},
    });
    if (!user) {
      throw new CustomError(`There's no customer matching username ${username}`, 404);
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new CustomError(`Incorrect password for username ${username}`, 401); // Use 401 for authentication failure.
    }
    return {access:true,id:user.id}
  } catch (error) {
    throw new CustomError(error.message, 500);
  }
};

module.exports = attemptLoginHandler;
