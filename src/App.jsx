import { useEffect, useState, useRef } from "react";
import "./App.css";
const App = () => {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const secHandRef = useRef(null);
  const minHandRef = useRef(null);
  const clockRef = useRef(null);
  const [updateSec, setUpdateSec] = useState(0);
  const [updateMins, setUpdateMins] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (sec >= 59) {
        setSec(0);
        setMin((prev) => +prev + 1);
      } else {
        setSec((prev) => +prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [sec]);

  const getRotation = (handType) => {
    const rotation = handType === "min" ? min : sec;
    const degrees = rotation * 6 - 90;
    return `rotate(${degrees}deg)`;
  };

  return (
    <>
      <div ref={clockRef} className="clock">
        <div
          style={{
            transform: getRotation("min"),
          }}
          ref={secHandRef}
          className="hand min"
        />
        <div
          ref={minHandRef}
          style={{
            transform: getRotation("sec"),
          }}
          className="hand sec"
        />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <div
            style={{
              transform: `rotate(${item * 30}deg)`,
            }}
            className="number"
            id={item}
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
      <hr />
      <div
        style={{
          border: "1px solid black",
        }}
      >
        <h2>
          {sec} | {min}
        </h2>
        <input
          value={updateSec}
          onChange={(e) => setUpdateSec(e.target.value)}
          placeholder="new secs"
        />
        <input
          value={updateMins}
          placeholder="new mins"
          onChange={(e) => setUpdateMins(e.target.value)}
        />

        <button
          onClick={() => {
            setSec(updateSec);
            setMin(updateMins);
          }}
        >
          change
        </button>
      </div>
    </>
  );
};

export default App;
