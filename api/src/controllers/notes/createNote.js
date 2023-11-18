const createNoteHandler = require('../../handlers/notes/createNoteHandler')

const createNote = async (req, res) => {
  const data = req.body;
  try {
    const note = await createNoteHandler(data);
    res.status(200).json(note);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = createNote;