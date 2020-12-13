import React, {useState, useEffect} from 'react';

const format = (value) => value <= 9 ? `0${value}` : value;

//todo если экзамен завершается в свернутом состояниии, то при переходе к нему функция onFinish вызывывается дважды

const Timer = (
    {
        startDate = new Date(),
        isFinished = null,
        className = `timer`,
        runningClassName = `timerRunning`,
        stoppedClassName = `timerStopped`,
        isDecrease = false,
        startMin = 0,
        startSec = 0,
        stopMin = 0,
        stopSec = 0,
        onFinish = () => {
            console.log(`Время вышло`)
        }
    }
) => {
    const [date, setDate] = useState(new Date(0, 0, 0, 0, startMin, startSec));
    const currentDate = new Date();
    const startDateNum = Number(startDate);
    const currentDateNum = Number(currentDate);
    const remainder = (currentDateNum - Number(startDate)) % 60000;
    const currentMin = Math.floor((currentDateNum - startDateNum) / 60000);
    const currentSec = Math.floor(remainder / 1000);
    const diffMin = Math.abs(startMin - stopMin);
    const diffSec = Math.abs(startSec - stopSec);
    const stopDate = new Date(0, 0, 0, 0, stopMin, stopSec);
    const isTimeOver = (startDateNum + diffMin * 60000 + diffSec * 1000) <= currentDateNum;

    useEffect(() => {
            const timer = setInterval(() => {
                setDate(() => {

                    if (isDecrease) {
                        return new Date(0, 0, 0, 0, startMin - currentMin, startSec - currentSec - 1);
                    }

                    return new Date(0, 0, 0, 0, currentMin, currentSec + 1);
                });
            }, 1000);

            if (isTimeOver) {
                clearInterval(timer);

                if (Number(date) !== Number(stopDate)) {
                    setDate(stopDate);
                }
                if (!isFinished) {
                    setTimeout(onFinish, 0)
                }

            }
            return () => clearInterval(timer);
        });


    return (
        <span
            className={`${className} ${isTimeOver ? stoppedClassName : runningClassName}`}>{format(date.getMinutes())}:{format(date.getSeconds())} мин.</span>
    );
}

export default Timer;
