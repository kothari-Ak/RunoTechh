const express = require("express");
const router = express.Router()
const {createUser ,UpdateUser,userLogIn} = require('../controller/UserController')
const {createSlot ,bookSlot} = require('../controller/SlotsController')
const {getUserDetails, loginAdmin,slotDetails} = require('../controller/AdminController')
const { UserAuthentication, UserAuthorization } = require('../middleware/UserAuthentication')
 
router.post("/register", createUser)
router.put('/user/:userId/profile',UserAuthentication,UserAuthorization,UpdateUser)
router.post('/login',userLogIn)

router.post('/registerSlot',createSlot)
router.put('/bookSlots/:userId',bookSlot)

router.get('/admin/getUserDetails',getUserDetails)
router.get('/admin/login',loginAdmin)
router.get('/admin/slotDetails',slotDetails)

module.exports = router;