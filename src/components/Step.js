import React from 'react';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

export default (props) => {
    const {timeStarted = 'no start'} = props

    return (
        <div className='Step'>
            <p>stepKey: {props.stepKey}</p>
            <p>temp: {props.temp}</p>
            <p>notes: {props.notes}</p>
            <p>time started: {timeStarted.toString()}</p>
            <p>duration: {dayjs(props.timeStarted).to(dayjs(props.timeEnded), true)}</p>
        </div>
    );
}