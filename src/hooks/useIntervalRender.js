import {useState, useEffect} from 'react';

export default function useIntervalRender(interval) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
      const intervalHandle = setInterval(() => {
          console.log("interval called")
          setTick(x => x + 1);
      }, 1000);
     
      return () => {
          clearInterval(intervalHandle);
      }
  }, [tick])
}