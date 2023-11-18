const createUserHandler = require('../../handlers/users/createUserHandler')

const createUser = async (req, res) => {
  const data = req.body;
  try {
    const user = await createUserHandler(data);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = createUser;