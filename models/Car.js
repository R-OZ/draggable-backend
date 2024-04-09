const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    id: String,
    make: String,
    type: String,
    condition: String,
    yearMade: String
});

module.exports = mongoose.model('Car', carSchema);
