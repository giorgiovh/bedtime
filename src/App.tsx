import { useState, ChangeEvent } from 'react'
import './App.css'

type Time = {
  hour: number;
  minute: number;
}

function App() {
  const [wakeTime, setWakeTime] = useState<Time>({ hour: 0, minute: 0 })
  const [bedtime, setBedtime] = useState<Time | undefined>()

  function calculateBedtime(): void {
    if (wakeTime.hour && wakeTime.minute) {
      const bedTimeHour = wakeTime.hour >= 8 ? wakeTime.hour - 8 : wakeTime.hour + 16;
      const bedTimeMinute = wakeTime.minute;

      setBedtime({
        hour: bedTimeHour,
        minute: bedTimeMinute
      })
    }
  }

  const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
    const hour = parseInt(e.target.value, 10) || 0;
    setWakeTime({ ...wakeTime, hour })
  }

  const handleMinuteChange = (e: ChangeEvent<HTMLInputElement>) => {
    const minute = parseInt(e.target.value, 10) || 0;
    setWakeTime({ ...wakeTime, minute })
  }

  return (
    <>
      <h2>Enter your wake time</h2>
      <input type="number" placeholder='hour' value={wakeTime.hour} onChange={handleHourChange}/>
      <br />
      <input type="number" placeholder='minute' value={wakeTime.minute} onChange={handleMinuteChange}/>
      <br />
      <button onClick={calculateBedtime} disabled={!wakeTime.hour || !wakeTime.minute}>Calculate bedtime</button>
      {bedtime && `Your bedtime is ${bedtime.hour}:${bedtime.minute}`}
    </>
  )
}

export default App
