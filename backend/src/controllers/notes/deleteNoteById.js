const deleteNoteByIdHandler = require('../../handlers/notes/deleteNoteByIdHandler')

const deleteNoteById = async (req, res) => {
  const {id} = req.params
  try {
    const deletedNote = await deleteNoteByIdHandler(id);
    res.status(200).send(`Note with id ${id} has been deleted`);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = deleteNoteById;