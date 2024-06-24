import React from 'react';
import { Entity } from 'aframe-react';

const ControlPanel = ({ run, stop }) => {
  return (
    <>
      <Entity
        text={{ value: 'RUN', width: 5, align: 'center' }}
        geometry={{ primitive: 'plane', width: 1, height: 1, depth: 1 }}
        material={{ color: '#81171b' }}
        position="-2.5 1 -4"
        events={{ click: run }}
      />
      <Entity
        text={{ value: 'STOP', width: 5, align: 'center' }}
        geometry={{ primitive: 'plane', width: 1, height: 1, depth: 1 }}
        material={{ color: '#003049' }}
        position="2.5 1 -4"
        events={{ click: () => stop(true) }}
      />
    </>
  );
};

export default ControlPanel;
