const express = require('express');
const router = express.Router();
const {signup,login, forgotPassword, resetPassword, updatePassword, protect, sendActivationEmail, activateAccount, restrictToAdmin, getAllUsers, getAllUnactiveUsers} = require('../controllers/userController');

router.post('/signup',signup);
router.post('/login',login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.post('/admin/sendActivationEmail',protect,restrictToAdmin,sendActivationEmail);
router.post('/activate/:token', activateAccount)
router.get('/getAllUsers',protect,restrictToAdmin,getAllUsers)
router.get('/getAllUnactiveUsers',protect,restrictToAdmin,getAllUnactiveUsers)

router.patch('/updatePassword',protect,updatePassword)


module.exports = router;