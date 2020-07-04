import React, {useState} from 'react';
import dayjs from 'dayjs';
import TimeSince from './TimeSince';
import steps from '../data/steps';

export default (props) => {

    const emptyState = {
        step: '',
        temp: '',
        notes: '',
    }
   
    const [stepEntry, setStepEntry] = useState(emptyState);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.submitStepEntry({...stepEntry, timeStarted: dayjs()});
        setStepEntry(emptyState);
    }

    const handleChange = (event) => {
        const { target: { value, name } } = event;
        setStepEntry({...stepEntry, [name]: value});
    }

    return (
        <div className='StepEntry'>
            <TimeSince lastTime={props.lastTime}/>

            <form onSubmit={(e) => {handleSubmit(e)}}>
                <p>
                    <label htmlFor='step'>Step</label>
                    <select
                        type='select'
                        id='step'
                        name='step'
                        onChange={(e) => handleChange(e)}
                        value={stepEntry.step}>
                        {steps.map((step, index) => <option value={step} key={index}>{step}</option>)}
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
            <br />
        </div>
    );

}