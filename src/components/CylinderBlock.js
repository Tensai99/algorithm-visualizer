import React from 'react';
import './CylinderBlock.css';

const CylinderBlock = ({ height, color, size }) => {
  const blockStyle = {
    height: `${height}px`,
    backgroundColor: color,
    width: `${size}px`, // Set the width based on size prop
  };

  return (
    <div className="cylinder-block" style={blockStyle}>
      <div className="block-label">{height}</div>
    </div>
  );
};

export default CylinderBlock;

