const Car = require('../models/Car');

exports.addCar = async (req, res) => {
    try {
        const { id, make, type, condition, yearMade } = req.body;
        const existingCar = await Car.findOne({ id });

        if (existingCar) {
            return res.status(400).json({ error: 'Car with provided ID already exists' });
        }

        if (!id || !make || !type || !condition || !yearMade) {
            return res.status(400).json({ error: 'All fields (id, make, type, condition, yearMade) are required' });
        }

        const newCar = new Car({ id, make, type, condition, yearMade });
        await newCar.save();
        res.status(201).json({ message: 'Car added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { make, type, condition, yearMade } = req.body;
        const existingCar = await Car.findOne({ id });

        if (!existingCar) {
            return res.status(404).json({ error: 'Car does not exist - invalid ID' });
        }

        if (!id || !make || !type || !condition || !yearMade) {
            return res.status(400).json({ error: 'All fields (id, make, type, condition, yearMade) are required' });
        }

        existingCar.make = make;
        existingCar.type = type;
        existingCar.condition = condition;
        existingCar.yearMade = yearMade;
        await existingCar.save();
        res.json({ message: 'Car updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
