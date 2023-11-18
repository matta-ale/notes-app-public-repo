const createUserValidation = (req, res, next) => {
  const {username,password} = req.body;

  if (!username) return res.status(404).json({ error: 'Missing username'});
  if (!password) return res.status(404).json({ error: 'Missing password'});

  next();
  };

  module.exports = createUserValidation;