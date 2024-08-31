import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@mux/mux-player';

const Livestream: React.FC = () => {
    const [streamKey, setStreamKey] = useState<string | null>(null);
    const [ID, setID] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const createLiveStream = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/streams/create');
                const data = response.data;
                if (data && data.stream_key) {
                    setStreamKey(data.stream_key);
                    setID(data.playback_ids[0].id)
                } else {
                    throw new Error('Stream key not found in response');
                }
            } catch (err) {
                setError('Failed to create live stream');
                console.error('Error creating live stream:', err);
            }
        };

        createLiveStream();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!streamKey) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Live Stream</h1>
            <p>Stream Key: {streamKey}</p>
            <p>ID: {ID}</p>
            <mux-player
                playback-id="dwWKSr50002tYzErgNbnK7Lq6QA01aiqfG02Jq78DwSGca4"
                metadata-video-title="Placeholder (optional)"
                metadata-viewer-user-id="Placeholder (optional)"
                accent-color="#FF0000"
            ></mux-player>
        </div>
    );
};

export default Livestream;
