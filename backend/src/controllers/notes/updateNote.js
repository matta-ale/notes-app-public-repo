const updateNoteHandler = require('../../handlers/notes/updateNoteHandler');

const updateNote = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const note = await updateNoteHandler(data);
    res.status(200).json(note);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = updateNote;