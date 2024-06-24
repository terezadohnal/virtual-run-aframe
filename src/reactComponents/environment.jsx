import 'aframe';
import { Entity } from 'aframe-react';
import { runningTrackColors } from '../utils/constants';
import React from 'react';

export default function Environment() {
  return (
    <>
      <Entity
        primitive="a-sky"
        position="0 -20 0"
        height="2048"
        radius="30"
        src="#stadium"
        theta-length="90"
        width="2048"
      />
      <Entity
        primitive="a-plane"
        src="#grass"
        rotation="-90 0 0"
        height="100"
        width="100"
      />
      {runningTrackColors.map((color, index) => {
        const trackPositionX = (index + 1 - 2.5) * 1.1;
        const borderOffset = 0.02;

        return (
          <React.Fragment key={color}>
            <Entity
              primitive="a-plane"
              color={color}
              rotation="-90 0 0"
              height="100"
              width="1"
              position={`${trackPositionX} 0.2 0`}
            />
            <Entity
              primitive="a-plane"
              color="white"
              rotation="-90 0 0"
              height="100"
              width="0.1"
              position={`${trackPositionX - 0.55 - borderOffset} 0.21 0`}
            />
            <Entity
              primitive="a-plane"
              color="white"
              rotation="-90 0 0"
              height="100"
              width="0.1"
              position={`${trackPositionX + 0.55 + borderOffset} 0.21 0`}
            />
          </React.Fragment>
        );
      })}

      <Entity primitive="a-camera" wasd-controls={{ enabled: false }}>
        <Entity
          primitive="a-cursor"
          animation__click={{
            property: 'scale',
            startEvents: 'click',
            from: '0.1 0.1 0.1',
            to: '1 1 1',
            dur: 150,
          }}
        />
      </Entity>

      <Entity primitive="a-light" type="ambient" color="#445451" />
      <Entity primitive="a-light" type="point" intensity="2" position="2 4 4" />
      <Entity light={{ type: 'point' }} />
    </>
  );
}
