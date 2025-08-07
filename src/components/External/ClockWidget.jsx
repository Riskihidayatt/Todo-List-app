import { useState, useEffect } from "react";
import "./ClockWidget.css";

const ClockWidget = ({ time, loading }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="clock-widget">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="clock-widget">
      <div className="time-display">
        <span className="time">{formatTime(currentTime)}</span>
        {time && <span className="timezone">{time.timezone}</span>}
      </div>
    </div>
  );
};

export default ClockWidget;
