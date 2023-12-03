const { Category } = require('../../db');
const Sequelize = require('sequelize');
const CustomError = require('../../utils/customError');

const createCategoryHandler = async (data) => {
  const { name } = data;
  console.log(data);
  try {
    const foundCategory = await Category.findOne({ where: { name} });
    if (foundCategory) {
      return foundCategory
    } else {
      const created = await Category.create(data,{returning: true});
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

module.exports = createCategoryHandler;
