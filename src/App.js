import React from 'react';
import {useStickyState} from './hooks';

import dayjs from 'dayjs';

import StepEntry from './components/StepEntry';
import Steps from './components/Steps';
import Timeline from './components/Timeline';

import './App.css';

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

function App() {

  const [steps, setSteps] = useStickyState([], 'steps');

  const addStep = (step) => {
    // we need to change the duration of the previous step (if there was one), and then append this step

    const lastStep = steps.slice(-1) || [];
    const otherSteps = steps.slice(0, steps.length-1) || []
    if (steps.length > 0) {
      lastStep[0].timeEnded = dayjs();
      lastStep[0].duration = dayjs(lastStep[0].timeStarted).toNow(true);
    }

    setSteps([...otherSteps, ...lastStep, step]);
  }

  const clearAll = () => {
    setSteps([]);
  }

  const previousStep = steps.length ? steps[steps.length-1] : {};

  return (

    <>
      <StepEntry previousStep={previousStep} submitStepEntry={(e) => addStep(e)} clearAllSteps={() => clearAll()}/>
      <div className='container'>
        <Steps steps={steps}/>
        <Timeline steps={steps}/>
      </div>
    </>
  );
}

export default App;
