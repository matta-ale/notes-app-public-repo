const { Router } = require('express');

const {
   createCategory,
 } = require('../controllers/categories');

// const {
//    createUserValidation,
//  } = require('../middlewares/users');

const router = Router();

router.post("/categories", createCategory);

module.exports = router;
