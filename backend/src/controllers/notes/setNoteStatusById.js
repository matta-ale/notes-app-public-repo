//controller para cambiar el estado active/archived
const setNoteStatusByIdHandler = require('../../handlers/notes/setNoteStatusByIdHandler');

const setNoteStatusById = async (req, res) => {
  const {id} = req.params;
  
  try {
    const note = await setNoteStatusByIdHandler(id);
    res.status(200).json(note);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = setNoteStatusById;