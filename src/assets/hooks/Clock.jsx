import React, { useState, useEffect } from "react";

function useClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setCurrentTime(now);
    }

    const timer = setInterval(updateTime, 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  const date = currentTime.toLocaleDateString();
  const time = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return { date, time };
}

export default useClock;