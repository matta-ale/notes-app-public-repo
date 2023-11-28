const { Category } = require('../../db');
const Sequelize = require('sequelize');
const CustomError = require('../../utils/customError');

const createCategoryHandler = async (data) => {
  const { category } = data;

  try {
    const foundCategory = await Category.findOne({ where: { category } });
    if (foundCategory) {
      throw new CustomError(
        'Category already in database',
        409
      );
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
