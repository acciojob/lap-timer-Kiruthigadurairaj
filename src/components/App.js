import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [trackingTime, setTrackingTime] = useState(0);
  const [lapItem, setLapItem] = useState([]);
  const intervalTime = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalTime.current); // Cleanup on unmount
  }, []);

  function handleStart() {
    clearInterval(intervalTime.current);
    intervalTime.current = setInterval(() => {
      setTrackingTime((prevTime) => prevTime + 1);
    }, 10);
  }

  function handleStop() {
    if (intervalTime.current) {
      clearInterval(intervalTime.current);
      intervalTime.current = null;
    }
  }

  function handleLap() {
    setLapItem((prevItem) => [...prevItem, trackingTime]);
  }

  function handleReset() {
    clearInterval(intervalTime.current);
    intervalTime.current = null;
    setTrackingTime(0);
    setLapItem([]);
  }

  function pad(number) {
    return number < 10 ? `0${number}` : number;
  }

  return (
    <div className="timer">
      <h1>Lap Timer</h1>
      <p>
        {`${pad(Math.floor(trackingTime / 6000))}:${pad(
          Math.floor((trackingTime / 100) % 60)
        )}:${pad(trackingTime % 100)}`}
      </p>

      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleLap}>Lap</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <ul>
        {lapItem.map((item, index) => (
          <li key={index}>
            {`${pad(Math.floor(item / 6000))}:${pad(
              Math.floor((item / 100) % 60)
            )}:${pad(item % 100)}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

