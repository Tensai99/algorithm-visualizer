import React from 'react';
import './Blocks.css';

const Blocks = ({ height, color, size }) => {
  const blockStyle = {
    height: `${height}px`,
    backgroundColor: color, // Use color prop for background color
    width: `${size}px`, // Set the width based on size prop
  };

  return (
    <div className="block" style={blockStyle}>
      <div className="block-label">{height}</div>
    </div>
  );
};

export default Blocks;