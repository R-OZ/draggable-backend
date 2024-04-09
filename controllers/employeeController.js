const Employee = require('../models/Employee');

exports.addEmployee = async (req, res) => {
    try {
        const { id, firstName, lastName, email, role } = req.body;
        const existingEmployee = await Employee.findOne({ id });

        if (existingEmployee) {
            return res.status(400).json({ error: 'Employee with provided ID already exists' });
        }

        if (!id || !firstName || !lastName || !email || !role) {
            return res.status(400).json({ error: 'All fields (id, firstName, lastName, email, role) are required' });
        }

        const newEmployee = new Employee({ id, firstName, lastName, email, role });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, role } = req.body;
        const existingEmployee = await Employee.findOne({ id });

        if (!existingEmployee) {
            return res.status(404).json({ error: 'Employee does not exist - invalid ID' });
        }

        if (!id || !firstName || !lastName || !email || !role) {
            return res.status(400).json({ error: 'All fields (id, firstName, lastName, email, role) are required' });
        }

        existingEmployee.firstName = firstName;
        existingEmployee.lastName = lastName;
        existingEmployee.email = email;
        existingEmployee.role = role;
        await existingEmployee.save();
        res.json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
