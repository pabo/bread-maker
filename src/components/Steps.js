import React from 'react';
import Step from './Step';

export default (props) => {
    const { steps } = props;

        return (
        <div className='Steps'>
            {steps.map((step, index) => {
                return (<Step {...step} key={index} />);
            })}
        </div>
    );

}