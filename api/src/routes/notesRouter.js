const { Router } = require('express');

const {
   createNote,
   deleteNoteById,
   updateNote,
   setNoteStatusById
 } = require('../controllers/notes');

const {
   createNoteValidation,
   deleteNoteByIdValidation
 } = require('../middlewares/notes');

const router = Router();

router.post("/notes", createNoteValidation, createNote);
router.delete("/notes/:id", deleteNoteByIdValidation, deleteNoteById);
router.put("/notes", createNoteValidation, updateNote);
router.put("/notes/status/:id", setNoteStatusById);
// router.get("/customers", getAllCustomers);
// router.get("/customers/filter", getFilteredCustomers);

module.exports = router;
