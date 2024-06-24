import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DEFAULT_ENERGY_LEVEL, modelEnergy } from '../utils/constants';
import { useSettings } from '../store/SettingsContext';

export const useCollisionDetection = (
  runnerRef,
  objects,
  setCollidedObjects
) => {
  const objectRefs = useRef({}); // To store refs for object bounding boxes

  const { setVariables, setAlert } = useSettings();

  const createAndCheckBoundingCollision = () => {
    const updatedObjectRefs = {};
    let collisionDetected = false;
    let lastCollidedObject = null;

    objects.forEach((object) => {
      const objectEl = document.getElementById(object.id);
      if (objectEl) {
        const objectBoundingBox = new THREE.Box3().setFromObject(
          objectEl.object3D
        );
        updatedObjectRefs[object.id] = objectBoundingBox;

        const runnerEl = runnerRef.current.el.object3D;
        const runnerBoundingBox = new THREE.Box3().setFromObject(runnerEl);

        if (runnerBoundingBox.intersectsBox(objectBoundingBox)) {
          lastCollidedObject = object;
          setCollidedObjects((prevCollidedObjects) => [
            ...prevCollidedObjects,
            lastCollidedObject,
          ]);
          collisionDetected = true;
        }
      }
    });

    objectRefs.current = updatedObjectRefs;

    if (collisionDetected && lastCollidedObject) {
      const energyLevel = lastCollidedObject.model
        ? modelEnergy[lastCollidedObject.model.id]
        : DEFAULT_ENERGY_LEVEL;

      // Add energy boost
      if (lastCollidedObject.model.class === 'boost') {
        setVariables((prevVariables) => ({
          ...prevVariables,
          energy: Math.min(prevVariables.energy + energyLevel, 100),
        }));
        setAlert('Boost');
        setTimeout(() => {
          setAlert(null);
        }, 1000);
      }

      // Subtract energy
      if (lastCollidedObject.model.class === 'obstacle') {
        setVariables((prevVariables) => ({
          ...prevVariables,
          energy: Math.max(prevVariables.energy - energyLevel, 0),
        }));
        setAlert('Obstacle');
        setTimeout(() => {
          setAlert(null);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      createAndCheckBoundingCollision();
    }, 100);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [objects]);

  useEffect(() => {
    // Create initial object bounding boxes
    objects.forEach((object) => {
      const objectEl = document.getElementById(object.id);
      if (objectEl) {
        const objectBoundingBox = new THREE.Box3().setFromObject(
          objectEl.object3D
        );
        objectRefs.current[object.id] = objectBoundingBox;
      }
    });
  }, [objects]);
};
