import React from 'react';
import { parseMillisecondsIntoReadableTime } from '../util/time';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime);

export default (props) => {
    const {timerExpiration, timerAcknowledged, acknowledgeTimer} = props;
    const durationInMs = dayjs(timerExpiration).diff(dayjs());
    const expired = durationInMs <= 0;

    if (timerExpiration) {
        if (expired) {
            if (timerAcknowledged) {
                return null;
            }

            return (
                <div className='Timer expired' onClick={() => {acknowledgeTimer()}} >
                    Timer expired {parseMillisecondsIntoReadableTime(-durationInMs) } ago! (click to dismiss)
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