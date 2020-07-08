import React from 'react';
import { parseMillisecondsIntoReadableTime } from '../util/time';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

export default (props) => {
    const {timerExpiration, timerAcknowledged, setTimerAcknowledged} = props;
    const durationInMs = dayjs(timerExpiration).diff(dayjs());
    const expired = durationInMs <= 0;

    if (timerExpiration) {
        if (expired) {
            if (timerAcknowledged) {
                return null;
            }

            return (
                <div className='Timer expired'>
                    Timer expired {parseMillisecondsIntoReadableTime(-durationInMs) } ago!
                    <p><button onClick={() => {setTimerAcknowledged(true)}}>Acknowledge</button></p>
                </div>
            );
        }

        return (
            <div className='Timer' >
                {parseMillisecondsIntoReadableTime(durationInMs)}
            </div>
        );
    }

    return null;
}