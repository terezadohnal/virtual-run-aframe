import { useEffect } from 'react';

export const useRunnerMovement = (setRunnerPosition, objects) => {
  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.code === 'KeyA' || event.key === 'ArrowLeft') {
        setRunnerPosition((prevPosition) => ({
          ...prevPosition,
          x: prevPosition.x - 0.7,
        }));
      } else if (event.code === 'KeyD' || event.key === 'ArrowRight') {
        setRunnerPosition((prevPosition) => ({
          ...prevPosition,
          x: prevPosition.x + 0.7,
        }));
      } else if (event.code === 'Space') {
        createAndCheckBoundingCollision();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [objects]);
};
