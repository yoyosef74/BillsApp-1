const express = require('express');
const router = express.Router();
const {signup,login, forgotPassword, resetPassword, updatePassword, protect, sendActivationEmail, activateAccount} = require('../controllers/userController');

router.post('/signup',signup);
router.post('/login',login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.post('/admin/sendActivationEmail',sendActivationEmail);
router.post('/activate/:token', activateAccount)
router.use(protect);
router.patch('/updatePassword',updatePassword)


module.exports = router;