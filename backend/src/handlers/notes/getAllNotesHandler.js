const { Note } = require('../../db');
const CustomError = require('../../utils/customError');

const getAllNotesHandler = async (page,pageSize) => {
  try {
    const offset = (page-1)*pageSize
    const notes = await Note.findAndCountAll({
    //   where: {isActive:true},
      offset,
      limit: pageSize,
    });
    if(notes.rows.length===0) throw new CustomError('No notes in database',400);
    const totalPages = Math.ceil(notes.count / pageSize);

    const pagination = {
      currentPage: page,
      pageSize: pageSize,
      totalItems: notes.count,
      totalPages: totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };

    return { data: notes.rows, pagination };
  } catch (error) {
    throw new CustomError(error.message,500);
  }
};

module.exports = getAllNotesHandler;
