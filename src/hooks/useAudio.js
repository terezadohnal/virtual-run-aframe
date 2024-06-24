import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const useAudio = () => {
  const listener = useRef(new THREE.AudioListener());
  const shortSound = useRef(new THREE.Audio(listener.current));
  const longSound = useRef(new THREE.Audio(listener.current));
  const audioLoader = new THREE.AudioLoader();

  const playShortSound = (url) => {
    audioLoader.load(
      url,
      (buffer) => {
        shortSound.current.setBuffer(buffer);
        shortSound.current.setVolume(0.4);
        shortSound.current.play();
      },
      undefined,
      (err) => {
        console.error('An error occurred while loading the short audio:', err);
      }
    );

    shortSound.current.onEnded = () => {
      playLongSound('/music/woodkid-run-boy-run.mp3');
    };
  };

  const playLongSound = (url) => {
    audioLoader.load(
      url,
      (buffer) => {
        longSound.current.setBuffer(buffer);
        longSound.current.setLoop(true);
        longSound.current.setVolume(0.4);
        longSound.current.play();
      },
      undefined,
      (err) => {
        console.error('An error occurred while loading the long audio:', err);
      }
    );
  };

  const stopSounds = () => {
    if (shortSound.current.isPlaying) {
      shortSound.current.stop();
    }
    if (longSound.current.isPlaying) {
      longSound.current.stop();
    }
  };

  return { playShortSound, stopSounds };
};
