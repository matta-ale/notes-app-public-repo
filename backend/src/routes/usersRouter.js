const { Router } = require('express');

const {
   createUser,
   attemptLogin
 } = require('../controllers/users');

const {
   createUserValidation,
 } = require('../middlewares/users');

const router = Router();

router.post("/users", createUserValidation, createUser);
router.post("/users/login",createUserValidation, attemptLogin);

module.exports = router;
