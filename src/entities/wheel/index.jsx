import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { randomNumber } from '../../shared'

import './style.scss'

export const Wheel = () => {
  const [counter, setCounter] = useState(0);
  const [startPosition, setStartPosition] = useState(0)
  const intervalRef = useRef(null);
  
  
  const startCounterPlus = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((counter) => counter + 1);
    })
  }

  const startCounterMinus = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((counter) => counter - 1);
    })
  }

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    if(startPosition === 1 && counter === 90 || counter === -270){
      alert('Done')
      window.location.reload('false')
    } else if (startPosition === 0 && counter === -90 || counter === 270){
      alert('Done')
      window.location.reload('false')
    }
  })

  const pipePosition = () => {
    setStartPosition(randomNumber(0,1))
  }
  useEffect(pipePosition, [])

  return (
      <div className="wheel">
        <div className="wheel__img">
          <img src='./images/wheel.png' alt="Винт" style={{transform: `translate(-50%, -50%) rotate(${counter}deg)`}} className="absolute-center wheel__img"/>
          <img src='images/pipe.png' alt="Труба" className={startPosition === 1 ? 'absolute-center pipe' : 'absolute-center pipe pipeLeft'}/>
        </div>
        <div className="wheel__btns absolute-center">
          <button onMouseDown={startCounterMinus} onMouseUp={stopInterval} onMouseLeave={stopInterval}><img draggable={false} src='icons/arrow-l.svg' alt="Крутилка влево"/></button>
          <button onMouseDown={startCounterPlus} onMouseUp={stopInterval} onMouseLeave={stopInterval}><img draggable={false} src='icons/arrow-l.svg' alt="Крутилка вправо"/></button>
        </div>
      </div>
  );
};
