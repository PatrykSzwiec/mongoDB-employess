const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employees.controller')


router.get('/employees', EmployeeController.getAll)

router.get('/employees/random', EmployeeController.getRandom)

router.get('/employees/:id', EmployeeController.getEmpById)

router.post('/employees', EmployeeController.addEmp)

router.put('/employees/:id', EmployeeController.editEmp)

router.delete('/employees/:id', EmployeeController.delete)

module.exports = router;