const { Note } = require('../../db');
const CustomError = require('../../utils/customError');

const deleteNoteByIdHandler = async (id) => {
  
  try {
    const deletedNote = await Note.findByPk(id);
      
    if(!deletedNote) throw new CustomError(`There's no note matching id ${id}`,404)
    await deletedNote.destroy();
    return `Note with id ${id} has been deleted`
  } catch (error) {
    throw new CustomError(error.message,500);
  }
};

module.exports = deleteNoteByIdHandler;
