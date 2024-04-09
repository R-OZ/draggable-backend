const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.addEmployee);
router.put('/:id', employeeController.updateEmployee);

module.exports = router;
