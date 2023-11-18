const createNoteValidation = (req, res, next) => {
  const { title, detail, UserId } = req.body;

  if (!title) return res.status(404).json({ error: 'Missing title' });
  if (!UserId) return res.status(404).json({ error: 'Missing UserId' });

  next();
};

module.exports = createNoteValidation;
