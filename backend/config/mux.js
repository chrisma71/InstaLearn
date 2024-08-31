const Mux = require('@mux/mux-node');
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

const createLiveStream = async () => {
  try {
    const response = await mux.video.liveStreams.create({
      playback_policy: ['public'],
      new_asset_settings: { playback_policy: ['public'] }
    });
    return response;
  } catch (error) {
    throw new Error(`Mux API Error: ${error.message}`);
  }
};

module.exports = {
  createLiveStream
};
