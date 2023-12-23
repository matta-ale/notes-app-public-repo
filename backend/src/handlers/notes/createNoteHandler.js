const { Note, Category } = require('../../db');
const Sequelize = require('sequelize');
const CustomError = require('../../utils/customError');

const createNoteHandler = async (data) => {
  try {
    const createdNote = await Note.create(data,{
      include: [{
        model: Category,
        as: 'Categories', 
      }], 
    });
    return createdNote;
  } catch (error) {
    if (error instanceof CustomError) {
      throw new CustomError(error.message, error.statusCode);
    } else {
      throw new CustomError(error.message, 500);
    }
  }
};

module.exports = createNoteHandler;
