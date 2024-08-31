const express = require('express');
const router = express.Router();
const Mux = require('@mux/mux-node');

const mux = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET
});

router.post('/create', async (req, res) => {
    try {
        const liveStream = await mux.video.liveStreams.create({
            playback_policy: ['public'],
            new_asset_settings: { playback_policy: ['public'] },
        });
        res.json(liveStream);
    } catch (error) {
        console.error('Error creating live stream:', error);
        res.status(500).json({ error: 'Failed to create live stream' });
    }
});

module.exports = router;
