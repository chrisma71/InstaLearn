export interface LiveStreamResponse {
    data: {
      id: string;
      stream_key: string;
      status: string;
      playback_ids: Array<{
        policy: string;
        id: string;
      }>;
      created_at: string;
    };
  }
  