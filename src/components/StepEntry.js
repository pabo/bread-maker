import React, {useState} from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import steps from '../data/steps';

// TODO: this could be smarter. step after highest completed step? groupings?
const getNextStepKey = (stepKey) => {
    if (!stepKey) {
        return steps[0].key;
    }

    const foundIndex = steps.findIndex(item => item.key === stepKey);
    const nextIndex = foundIndex === steps.length - 1 ? foundIndex : foundIndex + 1;

    return steps[nextIndex].key;
}

const StepEntry = (props) => {

    const initialState = {
        stepKey: getNextStepKey(props.previousStep.stepKey),
        temp: '',
        notes: '',
    }
   
    const [stepEntry, setStepEntry] = useState(initialState);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.submitStepEntry({...stepEntry, timeStarted: dayjs()});
        setStepEntry({...initialState, stepKey: getNextStepKey(stepEntry.stepKey)});
    }

    const handleChange = (event) => {
        const { target: { value, name } } = event;
        setStepEntry({...stepEntry, [name]: value});
    }



    return (
        <div className='StepEntry'>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <p>
                    <label htmlFor='step'>Step</label>
                    <select
                        type='select'
                        id='step'
                        name='stepKey'
                        onChange={(e) => handleChange(e)}
                        value={stepEntry.stepKey}>
                        {steps.map((step) =>  {
                            return <option
                                    value={step.key}
                                    key={step.key}>{step.displayName}
                                   </option>
                        })}
                    </select>
                </p>

                <p>
                    <label htmlFor='temp'>Temp</label>
                    <input
                        type='select'
                        id='temp'
                        name='temp'
                        onChange={(e) => handleChange(e)}
                        value={stepEntry.temp}/>
                </p>

                <p>
                    <label htmlFor='notes'>Notes</label>
                    <input
                        type='text'
                        id='notes'
                        name='notes'
                        placeholder='too watery!'
                        onChange={(e) => handleChange(e)}
                        value={stepEntry.notes}/>
                </p>
                <input type='submit' />
            </form>
            <button onClick={() => props.clearAllSteps()}>Clear all</button>
        </div>
    );
}

StepEntry.propTypes = {
    previousStep: PropTypes.object.isRequired,
    submitStepEntry: PropTypes.func.isRequired,
    clearAllSteps: PropTypes.func.isRequired,
}

export default StepEntry;