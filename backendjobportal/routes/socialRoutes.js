const express = require('express')
const router = express.Router()
const socialController = require('../controllers/socialController')

router.get('/social/all', socialController.index);
router.post('/social/store', socialController.store);
router.get('/social/view/:user', socialController.view);
router.put('/social/update', socialController.update);


module.exports = router
