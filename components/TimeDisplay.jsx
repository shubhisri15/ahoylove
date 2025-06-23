import React, { useState, useEffect } from "react";
import TimeFormatSwitch from "./TimeFormatSwitch";

function getTimeDifference(offset) {
  
  const localTimezoneOffset = new Date().getTimezoneOffset()
  const targetTimezoneOffset = -offset / 60
  const diffMins = targetTimezoneOffset - localTimezoneOffset

  const hourDiff = Math.floor(Math.abs(diffMins) / 60);
  const minDiff = Math.abs(diffMins) % 60;
  const ahead = diffMins < 0;

  return `${hourDiff}h ${minDiff}m ${ahead ? 'ahead of' : 'behind'} you`;
}

function getTimeFromTimezone(timezoneOffsetSeconds, hour12 = false) {
  const offset = Number(timezoneOffsetSeconds);
  if (isNaN(offset)) {
    console.warn('timezoneOffsetSeconds must be a valid number');
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

  const displayedTime = hour12 ? <h1>{`${hh}:${mm}`}<span className='text-4xl'>{`${ampm}`}</span></h1> : <h1>{`${hh}:${mm}`}</h1>;
  const timeDifferenceString = getTimeDifference(offset)

  return { displayedTime, timeDifferenceString }
}

export default function TimeDisplay({ timezoneOffsetSeconds }) {

  const [format12hChecked, setFormat12hChecked] = useState(false);
  const [time, setTime] = useState(() =>
    getTimeFromTimezone(timezoneOffsetSeconds, format12hChecked).displayedTime
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeFromTimezone(timezoneOffsetSeconds, format12hChecked).displayedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezoneOffsetSeconds, format12hChecked]);

  return (
    <div>
      {time}
      <div className="flex items-center justify-center md:gap-4 gap-2">
        <p className='md:text-sm py-2 text-xs'>Adi is {getTimeFromTimezone(timezoneOffsetSeconds, format12hChecked).timeDifferenceString}</p>
        <TimeFormatSwitch checked={format12hChecked} setChecked={setFormat12hChecked}/>
      </div>
    </div>);
}
