import { useState, ChangeEvent } from 'react';
import './App.css';

type Time = {
  hour: string | null;
  minute: string | null;
  meridiem: string;
};

function App() {
  const [wakeTime, setWakeTime] = useState<Time>({ hour: null, minute: null, meridiem: 'AM' });
  const [bedtime, setBedtime] = useState<Time | undefined>();

  function calculateBedtime(): void {
    const wakeTimeHour = wakeTime.hour !== null ? parseInt(wakeTime.hour, 10) : null;
    const wakeTimeMinute = wakeTime.minute !== null ? parseInt(wakeTime.minute, 10) : null;

    if (wakeTimeHour !== null && wakeTimeMinute !== null) {
      let bedTimeHour = wakeTimeHour - 8;
      let bedTimeMeridiem = wakeTime.meridiem;

      if (bedTimeHour < 0) {
        bedTimeHour += 12;
        bedTimeMeridiem = wakeTime.meridiem === 'AM' ? 'PM' : 'AM';
      }

      if (bedTimeHour === 0) {
        bedTimeHour = 12;
      }

      setBedtime({
        hour: `${bedTimeHour}`,
        minute: wakeTimeMinute < 10 ? `0${wakeTimeMinute}` : `${wakeTimeMinute}`,
        meridiem: bedTimeMeridiem,
      });
    }
  }

  const handleHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const hour = e.target.value !== '' ? e.target.value : null;
    setWakeTime({ ...wakeTime, hour });
  };

  const handleMinuteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const minute = e.target.value !== '' ? e.target.value : null;
    setWakeTime({ ...wakeTime, minute });
  };

  const handleMeridiemChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const meridiem = e.target.value;
    setWakeTime({ ...wakeTime, meridiem });
  };

  const renderOptions = (start: number, end: number, unit: 'hour' | 'minute') => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={`${i < 10 && unit === 'minute' ? `0${i}` : `${i}`}`}>{`${i < 10 && unit === 'minute' ? `0${i}` : `${i}`}`}</option>);
    }
    return options;
  };

  return (
    <>
      <h2>Enter your wake time</h2>
      <select value={wakeTime.hour || ''} onChange={handleHourChange}>
        <option value="">Hour</option>
        {renderOptions(1, 12, 'hour')}
      </select>
      <select value={wakeTime.minute || ''} onChange={handleMinuteChange}>
        <option value="">Minute</option>
        {renderOptions(0, 59, 'minute')}
      </select>
      <select value={wakeTime.meridiem} onChange={handleMeridiemChange}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
      <br />
      <button onClick={calculateBedtime} disabled={!wakeTime.hour || !wakeTime.minute}>
        Calculate bedtime
      </button>
      {bedtime && `Your bedtime is ${bedtime.hour}:${bedtime.minute} ${bedtime.meridiem}`}
    </>
  );
}

export default App;