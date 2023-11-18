const getFilteredNotesHandler = require('../../handlers/notes/getFilteredNotesHandler')

const getFilteredNotes = async (req, res) => {
  const data = req.query
  try {
    const filteredNotes = await getFilteredNotesHandler(data);
    res.status(200).json(filteredNotes);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = getFilteredNotes;