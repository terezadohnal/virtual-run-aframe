import 'aframe';
import React from 'react';
import { useSettings } from '../store/SettingsContext';
import { Button } from '@nextui-org/button';
import { useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();
  const {
    variables: { difficulty, distance, elapsedDistance, energy },
    resetAll,
    formattedTime,
    formattedTempo,
  } = useSettings();

  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-45"
      >
        <source src="confetti.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex flex-col justify-center items-center w-full h-full gap-5 z-10">
        <h1 className="text-blue-500 font-semibold text-6xl">Zvládl jsi to!</h1>
        <p className="text-lg text-gray-500">Úroveň obtížnosti: {difficulty}</p>
        <p className="text-lg text-gray-500">
          Uběhnuto: {elapsedDistance.toFixed(2)}/{distance} km
        </p>
        <p className="text-lg text-gray-500">Čas: {formattedTime}</p>
        <p className="text-lg text-gray-500">Tempo: {formattedTempo}</p>
        <p className="text-lg text-gray-500">Energie: {energy}%</p>
        <Button
          color="primary"
          onClick={() => {
            resetAll();
            navigate('/');
          }}
        >
          Zaběhni si to znovu
        </Button>
      </div>
    </div>
  );
}

export default Results;
