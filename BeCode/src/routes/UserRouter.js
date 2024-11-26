const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController'); // Đảm bảo import đúng
const orderController = require('../controllers/OrderController'); 
const { authMiddleware, authUserMiddleware } = require("../middleware/Authmiddleware");

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.post('/log-out', userController.logoutUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);
router.get('/getAll', userController.getAllUser); 
router.get('/get-details/:id',userController.getDetailsUser);
router.post('/refresh-token', userController.refreshToken);




module.exports = router;
