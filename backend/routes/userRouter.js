const express = require('express');
const router = express.Router();
const {signup,login,protect2, forgotPassword, resetPassword, updatePassword, protect, sendActivationEmail, activateAccount, restrictToAdmin,restrictToFinance, restrictToAdminAndFinance, setDefaultCredentialsForEnrolledUsers, updateEmailAfterFirstLogin, verifyEmailAfterFirstLogin} = require('../controllers/authController');
const {getAllUsers, getAllUnactiveUsers, getAllNormalUsers, getUser,getAllNormalActiveUsers, getMe, deleteUser} = require('../controllers/userController')
router.post('/signup',signup);
router.get('/:id/me',
    protect,
    getUser)

router.post('/updateEmail',protect,updateEmailAfterFirstLogin);
router.post('/verifyEmail', protect,verifyEmailAfterFirstLogin)

router.get('/me2',
    protect2,
    getMe)

//Auth
router.post('/login',login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

//Sending activation email,admins only
router.post('/admin/sendActivationEmail',protect,restrictToAdmin,sendActivationEmail);
router.post('/activate/:token', activateAccount)

//Admin
router.get('/getAllUsers',protect,restrictToAdmin,getAllUsers)
router.get('/getAllNormalUsers',protect,restrictToAdmin,getAllNormalUsers)
router.get('/getAllUnactiveUsers',protect,restrictToAdmin,getAllUnactiveUsers)
router.delete('/:id',protect,restrictToAdmin,deleteUser)
//Finance and Admin
router.get('/:id',protect,restrictToAdminAndFinance,getUser)

//Finance
router.get('/finance/getAllNormalActiveUsers',protect,restrictToFinance,getAllNormalActiveUsers)
router.patch('/updatePassword',protect,updatePassword)

// router.post('/once',setDefaultCredentialsForEnrolledUsers);
module.exports = router;