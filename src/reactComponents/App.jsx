import React, { useState, useEffect, useRef } from 'react';
import { Entity, Scene } from 'aframe-react';
import 'aframe';
import 'aframe-extras';
import Assets from './assets';
import Environment from './environment';
import InfoBanner from './infoBanner';
import ControlPanel from './controlPanel';
import { models, lanes, modelWeights, runnersSpeed } from '../utils/constants';
import { getRandomWithWeights } from '../utils/functions';
import { useSettings } from '../store/SettingsContext';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../hooks/useAudio';
import { useRunnerMovement } from '../hooks/useRunnerMovement';
import { useCollisionDetection } from '../hooks/useCollisionDetection';

function App() {
  const navigate = useNavigate();

  const runnerRef = useRef();

  const [runnerPosition, setRunnerPosition] = useState({
    x: 0,
    y: 0.2,
    z: -2.2,
  });
  const [animation, setAnimation] = useState('Man_Clapping');
  const [objects, setObjects] = useState([]);
  const [collidedObjects, setCollidedObjects] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const { playShortSound, stopSounds } = useAudio();
  useRunnerMovement(setRunnerPosition, objects);
  useCollisionDetection(runnerRef, objects, setCollidedObjects);

  const { setVariables, setTotalCollidedObjects, variables } = useSettings();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRunning) return;

      setVariables((prevVariables) => {
        if (
          prevVariables.energy <= 10 ||
          prevVariables.elapsedDistance >= prevVariables.distance
        ) {
          stop(prevVariables.energy <= 10);
          return prevVariables;
        }

        return {
          ...prevVariables,
          time: prevVariables.time + 1,
          speed: runnersSpeed[prevVariables.difficulty](prevVariables.energy),
          elapsedDistance: prevVariables.elapsedDistance + prevVariables.speed,
          energy: prevVariables.energy - 0.75,
        };
      });

      return () => clearInterval(interval);
    }, 1000);
  }, [isRunning]);

  const stopCounting = () => {
    setIsRunning(false);
    setTotalCollidedObjects(collidedObjects.length);
  };

  const run = () => {
    setTimeout(() => {
      setAnimation('Man_Run');
      setIsRunning(true);
      startGeneratingObjects();
    }, 6000);
    playShortSound('/music/3-seconds.mp3');
  };

  const stop = (isExhausted = false) => {
    if (isExhausted) {
      setAnimation('Man_Death');
    } else {
      setAnimation('Man_Walk');
      setTimeout(() => {
        setAnimation('Man_Idle');
      }, 3000);
    }

    stopCounting();

    setTimeout(() => {
      navigate('/results');
      stopSounds();
    }, 6000);
  };

  const generateObject = () => {
    const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
    const randomModelIndex = Math.min(
      getRandomWithWeights(Object.values(modelWeights[variables.difficulty])),
      models.length - 1
    );
    const randomModel = models[randomModelIndex];

    const newObject = {
      id: Math.random().toString(36).substr(2, 9),
      position: { x: randomLane, y: 1, z: -50 },
      model: randomModel,
      animationStartTime: Date.now(), // Record the start time of animation
    };

    setObjects((prevObjects) => [...prevObjects, newObject]);
  };

  const startGeneratingObjects = () => {
    let intervalSpeed;
    switch (variables.difficulty) {
      case 'easy':
        intervalSpeed = 2000; // 2 seconds
        break;
      case 'tempo':
        intervalSpeed = 1000; // 1 seconds
        break;
      case 'race':
        intervalSpeed = 500; // 0.5 seconds
        break;
      default:
        intervalSpeed = 2000; // Default speed (2 seconds)
    }

    setInterval(() => {
      generateObject();
    }, intervalSpeed);
  };

  return (
    <div className="relative h-screen w-screen">
      <InfoBanner />
      <Scene keyboard-shortcuts="enterVR: false">
        <Assets />
        <Environment />
        {objects.map((object) => (
          <Entity
            key={object.id}
            id={object.id}
            class="collidable"
            gltf-model={object.model.id}
            scale={object.model.scale}
            position={object.position}
            animation={{
              property: 'position',
              to: `${object.position.x} ${object.position.y} 2`,
              dur: 8000,
              easing: 'linear',
              loop: false,
            }}
          />
        ))}
        <ControlPanel run={run} stop={stop} />
        <Entity
          gltf-model="#runner"
          position={runnerPosition}
          ref={runnerRef}
          rotation="0 -180 0"
          scale="0.3 0.3 0.3"
          animation-mixer={`clip: HumanArmature|${animation};`}
        />
      </Scene>
    </div>
  );
}

export default App;
