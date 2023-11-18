const attemptLoginHandler = require('../../handlers/users/attemptLoginHandler')

const attemptLogin = async (req, res) => {
  const {username,password} = req.body
  try {
    const user = await attemptLoginHandler(username,password);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = attemptLogin;