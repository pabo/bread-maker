import React from 'react';

export default (props) => {

    return (
        <div className='Step'>
            <p>stepKey: {props.stepKey}</p>
            <p>temp: {props.temp}</p>
            <p>notes: {props.notes}</p>
            <p>time started: {props.timeStarted.toString()}</p>
            <p>duration: {props.duration}</p>
        </div>
    );
}