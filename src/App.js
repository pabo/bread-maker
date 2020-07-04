import React, {useState} from 'react';
import './App.css';
import StepEntry from './components/StepEntry';
import Steps from './components/Steps';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

function App() {

  const [steps, setSteps] = useState([]);
  const [lastTime, setLastTime] = useState(null); //could be derived from steps...

  const addStep = (step) => {
    // we need to change the duration of the previous step (if there was one), and then append this step

    const lastStep = steps.slice(-1) || [];
    const otherSteps = steps.slice(0, steps.length-1) || []
    if (steps.length > 0) {
      lastStep[0].duration = lastStep[0].timeStarted.toNow(true);
    }

    setSteps([...otherSteps, ...lastStep, step]);
    setLastTime(dayjs())
  }

  return (
    <>
      <StepEntry lastTime={lastTime} submitStepEntry={(e) => addStep(e)}/>
      <Steps steps={steps} lastTime={lastTime}/>
    </>
  );
}

export default App;
