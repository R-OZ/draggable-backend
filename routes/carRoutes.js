const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/', carController.addCar);
router.put('/:id', carController.updateCar);

module.exports = router;
