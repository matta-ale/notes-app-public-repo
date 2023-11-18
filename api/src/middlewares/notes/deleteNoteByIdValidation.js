const deleteNoteByIdValidation = (req, res, next) => {
    const {id} = req.params;
    if (!id) return res.status(404).json({ error: 'Missing note id'});
    next();
    };
  
    module.exports = deleteNoteByIdValidation;