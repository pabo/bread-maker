import React from 'react';

export default (props) => {

    return (
        <div className='Step'>
            <p>step: {props.step}</p>
            <p>temp: {props.temp}</p>
            <p>notes: {props.notes}</p>
            <p>time started: {props.timeStarted.toString()}</p>
            <p>duration: {props.duration}</p>
        </div>
    );
}