import { useEffect, useState } from 'react';

const formatDate = (now) => {
  if (!now) return '';
  const hours = `0${now.getHours()}`.slice(-2);
  const minutes = `0${now.getMinutes()}`.slice(-2);
  const seconds = `0${now.getSeconds()}`.slice(-2);

  return `${hours}:${minutes}:${seconds}`;
};

function useClock() {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      const newTimeString = formatDate(now);
      setTimeString(newTimeString);
    }, 1000);

    return () => {
      console.log('clearTimeout');
      clearTimeout(clockInterval);
    };
  }, []);

  return { timeString };
}

export default useClock;
