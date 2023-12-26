import React, { useState } from 'react';

type Time = {
  hour: number;
  minute: number;
  isAM: boolean; // true for AM, false for PM
};

const AlarmCalculator: React.FC = () => {
  const [alarmTime, setAlarmTime] = useState<Time>({
    hour: 7,
    minute: 0,
    isAM: true,
  });
  const [bedTime, setBedTime] = useState<Time>({
    hour: 23,
    minute: 0,
    isAM: true,
  });
  const [windDownTime, setWindDownTime] = useState<Time>({
    hour: 22,
    minute: 0,
    isAM: true,
  });

  const handleAlarmChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = parseInt(e.target.value, 10);
    setAlarmTime({
      ...alarmTime,
      [field]: isNaN(value) ? 0 : value,
    });
  };

  const calculateTimes = () => {
    const { hour, minute, isAM } = alarmTime;

    // Calculate Bedtime (8 hours before alarm)
    let bedHour = hour - 8;
    let bedIsAM = isAM;
    if (bedHour < 1) {
      bedHour = 12 + bedHour;
      bedIsAM = !bedIsAM;
    }
    setBedTime({
      hour: bedHour,
      minute,
      isAM: bedIsAM,
    });

    // Calculate Winddown Time (9 hours before alarm)
    let windDownHour = hour - 9;
    let windDownIsAM = isAM;
    if (windDownHour < 1) {
      windDownHour = 12 + windDownHour;
      windDownIsAM = !windDownIsAM;
    }
    setWindDownTime({
      hour: windDownHour,
      minute,
      isAM: windDownIsAM,
    });
  };

  return (
    <div>
      <h2>Alarm Calculator</h2>
      <div>
        <label>
          Alarm Time:
          <input type="number" value={alarmTime.hour} onChange={(e) => handleAlarmChange(e, 'hour')} />
          :
          <input type="number" value={alarmTime.minute} onChange={(e) => handleAlarmChange(e, 'minute')} />
          <select value={alarmTime.isAM ? 'AM' : 'PM'} onChange={(e) => setAlarmTime({ ...alarmTime, isAM: e.target.value === 'AM' })}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </label>
        <br /><br />
        <button onClick={calculateTimes}>Calculate</button>
      </div>
      <div>
        <h3>Bedtime: {`${bedTime.hour}:${bedTime.minute.toString().padStart(2, '0')} ${bedTime.isAM ? 'AM' : 'PM'}`}</h3>
        <h3>Wind Down Time: {`${windDownTime.hour}:${windDownTime.minute.toString().padStart(2, '0')} ${windDownTime.isAM ? 'AM' : 'PM'}`}</h3>
      </div>
    </div>
  );
};

export default AlarmCalculator;