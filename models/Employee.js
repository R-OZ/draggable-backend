const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    role: String
});

module.exports = mongoose.model('Employee', employeeSchema);
