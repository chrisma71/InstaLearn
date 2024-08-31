const Mux = require('@mux/mux-node');
const { Video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

exports.createLiveStream = async (req, res) => {
  try {
    const liveStream = await Video.LiveStreams.create({
      playback_policy: ['public'],
      new_asset_settings: { playback_policy: ['public'] },
    });
    res.json(liveStream);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
