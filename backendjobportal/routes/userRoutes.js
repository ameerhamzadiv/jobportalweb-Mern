const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.get('/user/all', userController.index)
router.post('/user/store', userController.store)
router.get('/user/view/:id', userController.view)
router.patch('/user/update', userController.update)
router.delete('/user/destroy/:id', userController.destroy)


module.exports = router


