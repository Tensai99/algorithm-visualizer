import React from 'react';
import './CylinderBlock.css';

const CylinderBlock = ({ height }) => {
  return (
    <div className="cylinder-block">
      <div className="block-label">{height}</div>
    </div>
  );
};

export default CylinderBlock;

