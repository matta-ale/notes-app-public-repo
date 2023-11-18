const getAllNotesHandler = require('../../handlers/notes/getAllNotesHandler')

const getAllNotes = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const notes = await getAllNotesHandler(page,pageSize);
    res.status(200).json(notes);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = getAllNotes;
