import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const randomColor = (currentColor) => {
  const COLOR_LIST = ['red', 'green', 'yellow'];

  const currentIndex = COLOR_LIST.indexOf(currentColor);
  let newIndex = currentIndex;

  while (newIndex === currentIndex) {
    newIndex = Math.floor(Math.random() * 3);
  }
  return COLOR_LIST[newIndex];
};

const useMagicColor = () => {
  const [color, setColor] = useState('transparent');
  const colorRef = useRef('transparent');

  useEffect(() => {
    const colorInterval = setInterval(() => {
      // console.log('first color:', color);
      // console.log('Change color:', colorRef.current);

      const newColor = randomColor(colorRef.current);
      setColor(newColor);
      colorRef.current = newColor;
    }, 1000);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  return color;
};

export default useMagicColor;
