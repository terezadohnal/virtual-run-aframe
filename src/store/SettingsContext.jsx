import React, { createContext, useState, useContext } from 'react';
import { runnersSpeed } from '../utils/constants';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [totalCollidedObjects, setTotalCollidedObjects] = useState(0);
  const [alert, setAlert] = useState(null);

  const [variables, setVariables] = useState({
    distance: 5,
    difficulty: 'easy',
    energy: 100,
    speed: runnersSpeed.easy(100),
    elapsedDistance: 0,
    time: 0,
  });

  const resetAll = () => {
    setVariables({
      distance: 5,
      difficulty: 'easy',
      energy: 100,
      speed: runnersSpeed.easy(100),
      elapsedDistance: 0,
      time: 0,
    });
  };

  const minutes = Math.floor(variables.time / 60);
  const displaySeconds = variables.time % 60;

  return (
    <SettingsContext.Provider
      value={{
        totalCollidedObjects,
        setTotalCollidedObjects,
        alert,
        setAlert,
        resetAll,
        variables,
        setVariables,
        formattedTime: `${minutes}:${
          displaySeconds < 10 ? '0' : ''
        }${displaySeconds}`,
        formattedTempo: `${((1 / variables.speed) * 0.6).toFixed(2)} min/km`,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
