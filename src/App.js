import React, {useState} from 'react';
import './App.css';
import StepEntry from './components/StepEntry';
import Steps from './components/Steps';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

function App() {

  const [steps, setSteps] = useState([]);

  const addStep = (step) => {
    // we need to change the duration of the previous step (if there was one), and then append this step

    const lastStep = steps.slice(-1) || [];
    const otherSteps = steps.slice(0, steps.length-1) || []
    if (steps.length > 0) {
      lastStep[0].duration = lastStep[0].timeStarted.toNow(true);
    }

    setSteps([...otherSteps, ...lastStep, step]);
  }

  const previousStep = steps.length ? steps[steps.length-1] : {};

  return (

    <>
      <StepEntry previousStep={previousStep} submitStepEntry={(e) => addStep(e)}/>
      <Steps steps={steps}/>
    </>
  );
}

export default App;
