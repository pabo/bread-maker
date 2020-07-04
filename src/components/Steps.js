import React from 'react';
import dayjs from 'dayjs';
import Step from './Step';
var relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime);

export default (props) => {
    const { steps } = props;

        return (
        <div>
            {steps.map((step, index) => {
                return (<Step {...step} key={index} />);
            })}
        </div>
    );

}