const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB connection with mongoose
//Note: replace with monogoDB online
mongoose.connect('mongodb://localhost:27017/mern');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {console.log('Connected to MongoDB successfully') });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const customerRoutes = require('./routes/customerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const carRoutes = require('./routes/carRoutes');

app.use('/api/customer', customerRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/car', carRoutes);

//count the number of times any API is called -> this was a requirement of the assessment
let addCount = 0;
let updateCount = 0;

app.post('/api/count/add', (req, res) => {
    addCount++;
    res.json({ count: addCount });
});

app.post('/api/count/update', (req, res) => {
    updateCount++;
    res.json({ count: updateCount });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
