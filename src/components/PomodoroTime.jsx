// src/components/PomodoroTimer.jsx
import React, { useState, useEffect } from 'react';

const PomodoroTimer = ({ onComplete }) => {
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes in seconds
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let timer;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            onComplete(isBreak);
            setIsBreak(!isBreak);
            setTimeLeft(isBreak ? 1500 : 300); // Switch between work (25 min) and break (5 min)
        }
        return () => clearInterval(timer);
    }, [isActive, timeLeft, isBreak, onComplete]);

    const startTimer = () => {
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(1500);
        setIsBreak(false);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className="pomodoro-timer text-white text-center">
            <h1 className='text-white mt-10 font-bold text-2xl'>{isBreak ? 'Break Time!' : 'Focus Time!'}</h1>
            <div className="timer">{formatTime(timeLeft)}</div>
            <div className='flex gap-2 justify-center '>
            <button onClick={startTimer} disabled={isActive} className='bg-green-500 font-semibold px-4 py-2'>Start</button>
            <button onClick={stopTimer} disabled={!isActive} className='bg-green-500 font-semibold px-4 py-2'>Stop</button>
            <button onClick={resetTimer} className='bg-green-500 font-semibold px-4 py-2'>Reset</button>
            </div>
        </div>
    );
};

export default PomodoroTimer;