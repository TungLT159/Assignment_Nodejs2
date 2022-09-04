const path = require('path');

const express = require('express');

const staffController = require('../controllers/staff');

const router = express.Router();

router.get('/', staffController.getIndex)

router.get('/staff', staffController.getStaff)

router.get('/work', staffController.getWork)

router.get('/covid', staffController.getCovid)

router.post('/covid', staffController.postCovid)

router.post('/post-image', staffController.postImage)

router.post('/start-work', staffController.postWorking)

router.post('/end-work', staffController.postEndWorking)

router.post('/end-day-work', staffController.postEndDayWork)

router.post('/off-work', staffController.postOffWork)

router.post('/work', staffController.postWork)



module.exports = router;