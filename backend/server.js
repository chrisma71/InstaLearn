require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const streamRoutes = require('./routes/streamRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

//connectDB();

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);
app.use('/api/streams', streamRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
