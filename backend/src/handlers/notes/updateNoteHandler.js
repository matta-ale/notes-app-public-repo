const { Note } = require('../../db');
const CustomError = require('../../utils/customError');

const updateNoteHandler = async (data) => {
  const { id } = data;

  try {
    const updated = await Note.update(data, {
      where: { id:id}, return: true, raw:true,
    });
    if (updated[0]===0) {
      throw new CustomError(`Can't update note with id ${id}`, 400);
    } else {
      return `Note with id ${id} succesfully updated`;
    }
  } catch (error) {
    throw new CustomError(error.message,500);
  }
};

module.exports = updateNoteHandler;
