const { Category, Note } = require('../../db');
const Sequelize = require('sequelize');
const CustomError = require('../../utils/customError');

const getCategoriesByNoteIdHandler = async (noteId) => {
  try {
    const note = await Note.findByPk(noteId, {
      include: {
        model: Category,
        as: 'Categories',
      }
    });
    if (!note) {
      throw new CustomError(`Note with id ${noteId} not found`, 404);
    }
    const categories = note.Categories.map(
      (category) =>
        (category = {
          id: category.dataValues.id,
          name: category.dataValues.name,
        })
    );
    return categories;
  } catch (error) {
    if (error instanceof CustomError) {
      throw new CustomError(error.message, error.statusCode);
    } else {
      throw new CustomError(error.message, 500);
    }
  }
};

module.exports = getCategoriesByNoteIdHandler;
