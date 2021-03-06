//SEE correctTimer file, this is old version

import React, {useState, useEffect} from 'react';

const format = (value) => value <= 9 ? `0${value}` : value;

const Timer = ({
                   className = `timer`,
                   runningClassName = `timerRunning`,
                   stoppedClassName = `timerStopped`,
                   isDecrease = false,
                   startMin = 0,
                   startSec = 0,
                   stopMin = 0,
                   stopSec = 0
               }) => {

    const [date, setDate] = useState(new Date(0, 0, 0, 0, startMin, startSec, 0,));
    const currentMin = date.getMinutes();
    const currentSec = date.getSeconds();

    const isTimeOver = () => isDecrease ? currentMin <= stopMin && currentSec <= stopSec : currentMin >= stopMin && currentSec >= stopSec;

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(() => {
                if (isTimeOver()) {
                    clearInterval(timer);
                    return new Date(0, 0, 0, 0, date.getMinutes(), date.getSeconds(), 0)
                }

                if (isDecrease) {
                    return new Date(0, 0, 0, 0, date.getMinutes(), date.getSeconds() - 1, 0);
                }

                return new Date(0, 0, 0, 0, date.getMinutes(), date.getSeconds() + 1, 0);
            });
        }, 1001);
        return () => clearInterval(timer);
    });


    return (
        <span className={`${className} ${isTimeOver() ? stoppedClassName : runningClassName}`}>{format(currentMin)}:{format(currentSec)} мин.</span>
    );
}

export default Timer;
