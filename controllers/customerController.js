const Customer = require('../models/Customer');

exports.addCustomer = async (req, res) => {
    try {
        const { id, firstName, lastName, email } = req.body;
        const existingCustomer = await Customer.findOne({ id });

        if (existingCustomer) {
            return res.status(400).json({ error: 'Customer with provided ID already exists' });
        }

        if (!id || !firstName || !lastName || !email) {
            return res.status(400).json({ error: 'All fields (id, firstName, lastName, email) are required' });
        }

        const newCustomer = new Customer({ id, firstName, lastName, email });
        await newCustomer.save();
        res.status(201).json({ message: 'Customer added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        const existingCustomer = await Customer.findOne({ id });

        if (!existingCustomer) {
            return res.status(404).json({ error: 'Customer does not exist - invalid ID' });
        }

        if (!id || !firstName || !lastName || !email) {
            return res.status(400).json({ error: 'All fields (id, firstName, lastName, email) are required' });
        }

        existingCustomer.firstName = firstName;
        existingCustomer.lastName = lastName;
        existingCustomer.email = email;
        await existingCustomer.save();
        res.json({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
