import React, {useState, useEffect} from 'react';
import dayjs from 'dayjs';

const msPerPixel = 5000; // 1000 means 1 pixel per second

// takes a number of milliseconds and returns a human readable duration
function parseMillisecondsIntoReadableTime(milliseconds){
    //Get hours from milliseconds
    var hours = milliseconds / (1000*60*60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;
  
    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;
  
    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;
  
    return h + ':' + m + ':' + s;
  }
  

export default (props) => {
    const { steps } = props;
    const totalTime = steps[0] ? dayjs().diff(steps[0].timeStarted) : '';

    const [tick, setTick] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            console.log("timeout called")
            setTick(x => x + 1)
        }, 1000)
    }, [tick])

    return (
        <div className='Timeline'>
            <p>Timeline</p>
            <p>Total time: {totalTime}</p>

            <div className="container" style={{flexDirection: 'column'}}>
                {steps.map((step, index) => {

                    // this logs twice, indicating double render?
                    // console.log(step)
                    const durationInMs = step.timeEnded ? dayjs(step.timeEnded).diff(step.timeStarted) : dayjs().diff(step.timeStarted);

                    return (
                        <div
                            className='timeline-step'
                            // style={{border: '1px solid black', flexBasis: 100*durationInMs/totalTime + '%'}}
                            style={{border: '1px solid black', height: 50 + durationInMs/msPerPixel + 'px'}}
                            key={index}>
                                
                            {step.stepKey}: {parseMillisecondsIntoReadableTime(durationInMs)}
                        </div>
                    );
                })}
            </div>
        </div>
    );

}