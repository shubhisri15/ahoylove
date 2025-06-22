import React, { useState, useEffect } from "react";

function getTimeFromTimezone(timezoneOffsetSeconds, hour12 = false) {
  const offset = Number(timezoneOffsetSeconds);
  if (isNaN(offset)) {
    console.error('timezoneOffsetSeconds must be a valid number');
    return `Loading time..`
  }

  const nowUTC = new Date();
  const targetTime = new Date(nowUTC.getTime() + offset * 1000);

  let hours = targetTime.getUTCHours();
  let ampm = '';

  if (hour12) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
  }

  const hh = String(hours).padStart(2, '0');
  const mm = String(targetTime.getUTCMinutes()).padStart(2, '0');

  return hour12 ? `${hh}:${mm} ${ampm}` : `${hh}:${mm}`;
}

export default function TimeDisplay({ timezoneOffsetSeconds, hour12 = false }) {
  const [time, setTime] = useState(() =>
    getTimeFromTimezone(timezoneOffsetSeconds, hour12)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeFromTimezone(timezoneOffsetSeconds, hour12));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezoneOffsetSeconds, hour12]);

  return <div>{time}</div>;
}
