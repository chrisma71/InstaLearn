import React from 'react';
import '@mux/mux-player';

interface LiveStreamProps {
  playbackId: string;
}

const LiveStream: React.FC<LiveStreamProps> = ({ playbackId }) => {
  return (
    <mux-player
      stream-type="live"
      playback-id={playbackId}
      controls
      auto-play
    ></mux-player>
  );
};

export default LiveStream;
