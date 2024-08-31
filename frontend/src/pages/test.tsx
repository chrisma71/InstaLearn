import React, { useEffect, useState } from 'react';
import LiveStream from '../components/Livestream';

const App: React.FC = () => {
  const [playbackId, setPlaybackId] = useState<string>('');

  useEffect(() => {
    async function fetchPlaybackId() {
      const response = await fetch('http://localhost:5000/api/create-live-stream');
      const data = await response.json();
      setPlaybackId(data.playback_ids[0].id);
    }

    fetchPlaybackId();
  }, []);

  return (
    <div className="App">
      {playbackId ? (
        <LiveStream playbackId={playbackId} />
      ) : (
        <p>Loading stream...</p>
      )}
    </div>
  );
};

export default App;
