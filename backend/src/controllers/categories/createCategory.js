const createCategoryHandler = require('../../handlers/categories/createCategoryHandler')

const createCategory = async (req, res) => {
  const data = req.body;
  try {
    const category = await createCategoryHandler(data);
    res.status(200).json(category);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = createCategory;