const { Router } = require('express');

const {
   createNote,
   deleteNoteById,
   updateNote,
   setNoteStatusById,
   getAllNotes,
   getFilteredNotes
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
router.get("/notes", getAllNotes);
router.get("/notes/filter", getFilteredNotes);

module.exports = router;
