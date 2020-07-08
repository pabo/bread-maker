import React from 'react';
import {useStickyState, useIntervalRender} from './hooks';

import dayjs from 'dayjs';

import StepEntry from './components/StepEntry';
import Steps from './components/Steps';
import Timeline from './components/Timeline';
import Timer from './components/Timer';

import './App.css';

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

function App() {

  const [steps, setSteps] = useStickyState('steps', []);
  const [timerExpiration, setTimerExpiration] = useStickyState('timerExpiration', null);
  const [timerAcknowledged, setTimerAcknowledged] = useStickyState('acknowledged', false);

  useIntervalRender(1000); // TODO: perf impact of re-rendering entire view every second?

  const addStep = (step) => {
    // we need to change the duration of the previous step (if there was one), and then append this step
    const lastStep = steps.slice(-1) || [];
    const otherSteps = steps.slice(0, steps.length-1) || []

    if (lastStep.length) {
      lastStep[0].timeEnded = dayjs();
    }

    setSteps([...otherSteps, ...lastStep, step]);
    setTimerAcknowledged(false);
    setTimerExpiration(
      step.timer === 'no timer' ? //TODO: magic word no good
      null :
      dayjs().add(parseInt(step.timer,10),'second')
    );
  }

  const clearAll = () => {
    setSteps([]);
    setTimerExpiration(null);
    setTimerAcknowledged(true);
  }

  const previousStep = steps.length ? steps[steps.length-1] : {};

  return (
    <>
      <StepEntry previousStep={previousStep} submitStepEntry={(e) => addStep(e)} clearAllSteps={() => clearAll()}/>
      <Timer timerExpiration={timerExpiration} timerAcknowledged={timerAcknowledged} setTimerAcknowledged={(x) => setTimerAcknowledged(x)}/>
      <div className='container'>
        <Steps steps={steps}/>
        <Timeline steps={steps}/>
      </div>
    </>
  );
}

export default App;
