const getCategoriesByNoteIdHandler = require('../../handlers/categories/getCategoriesByNoteIdHandler');

const getCategoriesByNoteId = async (req, res) => {
  const data = req.body;
  let categoriesArray = [];
  try {
    // Use map to create an array of promises
    const promises = data.notes.map(async (noteId) => {
      const noteCategories = await getCategoriesByNoteIdHandler(noteId);
      noteCategories.forEach((category) => {
        const existingCategory = categoriesArray.find(
          (existing) => existing.id === category.id
        );

        if (!existingCategory) {
          categoriesArray.push(category);
        }
      });
    });
    // Wait for all promises to resolve before continuing
    await Promise.all(promises);
    res.status(200).json(categoriesArray);
  } catch (error) {
    res.status(error.statusCode).json({ error: error.message });
  }
};

module.exports = getCategoriesByNoteId;
