const { Note, Category } = require('../../db');
const CustomError = require('../../utils/customError');

const setNoteStatusByIdHandler = async (id) => {

  try {
    const updatedNote = await Note.findByPk(id);
      
    if(!updatedNote) throw new CustomError(`There's no note matching id ${id}`,404)
    const updated = await Note.update({isActive:!updatedNote.isActive}, {
         where: {id:id}, return: true, raw:true,
       },{
        include: [Category],
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

module.exports = setNoteStatusByIdHandler;
