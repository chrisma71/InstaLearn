require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Video } = require('./config/mux');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

// Import routes
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/users', userRoutes);

// Testing endpoint for creating a live stream
app.get('/api/create-live-stream', async (req, res) => {
    try {
        const liveStream = await Video.liveStreams.create({
            playback_policy: 'public',
        });
        res.json(liveStream);
    } catch (error) {
        console.error('Error creating live stream:', error);
        res.status(500).json({ error: 'Failed to create live stream' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
