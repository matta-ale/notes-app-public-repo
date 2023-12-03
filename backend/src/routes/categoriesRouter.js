const { Router } = require('express');

const {
   createCategory,
   getCategoriesByNoteId
 } = require('../controllers/categories');


const router = Router();

router.post("/categories", createCategory);
router.post("/categoriesbynote", getCategoriesByNoteId);

module.exports = router;
