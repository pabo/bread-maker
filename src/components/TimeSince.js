import React, {useEffect, useState, useRef} from 'react';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);


export default (props) => {
    const {lastTime} = props;
    const relativeLastTimeThing = lastTime ? lastTime.toNow(true) : '';

    const [relativeLastTime, setRelativeLastTime] = useState(relativeLastTimeThing);
    const intervalHandle = useRef(false);

    useEffect(() => {
        if (!lastTime) {
            return;
        }

        clearInterval(intervalHandle.current);

        intervalHandle.current = setInterval(() => {
            setRelativeLastTime(`${lastTime.toNow(true)}`)
        }, 1000)
    }, [lastTime])

    return (
        <div>
            {props.lastTime ? `Current step has been running for ${relativeLastTime}` : 'Current step not yet started'}
        </div>
    );

}