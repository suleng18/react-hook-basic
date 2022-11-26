import React, { useState } from 'react';
import './ColorBox.scss';

ColorBox.propTypes = {};

const getRandomColor = () => {
  const COLOR_LIST = ['deeppink', 'green', 'orange', 'black', 'yellow'];
  const randomIndex = Math.floor(Math.random() * 5);
  return COLOR_LIST[randomIndex];
};

function ColorBox() {
  const [color, setColor] = useState(() => {
    const initColor = localStorage.getItem('box_color') || 'deeppink';
    return initColor;
  });

  const handleBoxClick = () => {
    const newColor = getRandomColor();
    setColor(newColor);
    localStorage.setItem('box_color', newColor);
  };

  return (
    <div className="color-box" style={{ backgroundColor: color }} onClick={handleBoxClick}>
      COLOR BOX
    </div>
  );
}

export default ColorBox;
