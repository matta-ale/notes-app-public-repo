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
// router.get("/customers", getAllCustomers);
// router.get("/customers/filter", getFilteredCustomers);
// router.get("/customers/:id", getCustomerByIdValidation, getCustomerById);
// router.post("/customers/forgotpassword",forgotPasswordValidation, forgotPassword);
// router.put("/customers", createCustomerValidation, updateCustomer);
// router.put("/customers/updatePassword", updatePasswordValidation, updatePassword);
// router.delete("/customers/:id",deleteCustomerByIdValidation,deleteCustomerById);
// router.delete("/customers/delete/:id",deleteCustomerByIdValidation,deleteCompletelyCustomerById);


module.exports = router;
