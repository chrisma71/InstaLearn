require('dotenv').config();

const express = require('express');
const { Video } = require('./config/mux');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

app.use(cors());

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
