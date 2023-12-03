const { Note, Category } = require('../../db');
const CustomError = require('../../utils/customError');

const updateNoteHandler = async (data) => {
  const { id, category, action } = data;
  
  try {
    const existingNote = await Note.findByPk(id);
    if (!existingNote) {
      throw new CustomError(`Note with id ${id} not found`, 404);
    } else {
    await Note.update(data, {
      where: { id:id}, return: true, raw:true,
    });
    if (category && action === 'add') {
      const updatedNote = await Note.findByPk(id);
      await updatedNote.addCategories(category);
    } else if (category && action === 'remove') {
      const updatedNote = await Note.findByPk(id);
      await updatedNote.removeCategories(category);
    }

      return `Note with id ${id} succesfully updated`;
    }
  } catch (error) {
    throw new CustomError(error.message,500);
  }
};

module.exports = updateNoteHandler;

