import { MuxPlayer } from '@mux/mux-player';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mux-player': MuxPlayer;
    }
  }
}