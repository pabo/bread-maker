import React, {useCallback} from 'react';
import {useStickyState, useIntervalRender} from './hooks';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import dayjs from 'dayjs';

import StepEntry from './components/StepEntry';
import Steps from './components/Steps';
import Timeline from './components/Timeline';
import Timer from './components/Timer';

import './App.css';

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

const initialState = {
  steps: [],
  timerAcknowledged: true,
  timerExpiration: null
};

function App() {

  // const [state, setState] = useState(initialState);
  const [state, setState] = useStickyState('state', initialState);
  const {steps, timerExpiration, timerAcknowledged} = state;

  // might need to set initial state as these defaults
  // const [timerExpiration, setTimerExpiration] = useStickyState('timerExpiration', null);
  // const [timerAcknowledged, setTimerAcknowledged] = useStickyState('acknowledged', false);

  useIntervalRender(1000); // TODO: perf impact of re-rendering entire view every second?

  const addStep = useCallback((step) => {
    // we need to change the duration of the previous step (if there was one), and then append this step
    const lastStep = state.steps.slice(-1) || [];
    const otherSteps = state.steps.slice(0, state.steps.length-1) || []

    if (lastStep.length) {
      lastStep[0].timeEnded = dayjs();
    }

    setState({...state,
      steps:[...otherSteps, ...lastStep, step],
      timerAcknowledged: false,
      //TODO: magic word no good
      timerExpiration: step.timer === 'no timer' ? null : dayjs().add(parseInt(step.timer,10),'second')
    });
  }, [state, setState]);

  const clearSteps = useCallback(() => {
    setState({...state, initialState });
  }, [state, setState]);

  const acknowledgeTimer = useCallback(() => {
    setState({...state,
      timerAcknowledged: true,
    });
  }, [state, setState]);

  return (
    <Router>
      <Switch>
        <Route path="/steps">
          <StepEntry steps={steps} addStep={addStep} clearSteps={clearSteps}/>
          <Timer timerExpiration={timerExpiration} timerAcknowledged={timerAcknowledged} acknowledgeTimer={acknowledgeTimer}/>
          <Steps steps={steps}/>
        </Route>
        <Route path="/">
          <StepEntry steps={steps} addStep={addStep} clearSteps={clearSteps}/>
          <Timer timerExpiration={timerExpiration} timerAcknowledged={timerAcknowledged} acknowledgeTimer={acknowledgeTimer}/>
          <Timeline steps={steps}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
