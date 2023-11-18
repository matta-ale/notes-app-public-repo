const createNote = require('./createNote');
const deleteNoteById = require('./deleteNoteById');
const updateNote = require('./updateNote');
const setNoteStatusById = require('./setNoteStatusById');
const getAllNotes = require('./getAllNotes');
const getFilteredNotes = require('./getFilteredNotes');

module.exports = {
  createNote,
  deleteNoteById,
  updateNote,
  setNoteStatusById,
  getAllNotes,
  getFilteredNotes
};
