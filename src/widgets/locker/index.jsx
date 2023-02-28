import React, {useState, useEffect} from 'react';
import CanvasCircle from '../../entities/canvasCircle'

import './style.scss'

export const Locker = () => {
  const [isHited, setIsHited] = useState(0);
  const [isYellow, setIsYellow] = useState(false)
  
  let maxCounter = 5;
  
  useEffect(() => {
    if(isHited === maxCounter){
      alert('Done')
      window.location.reload(false);
    }
  })

  const changeColor = () => {
    setIsYellow(true)
    setTimeout(() => {setIsYellow(false)}, 200)
  }

  return (
    <div className='locker'>
      <div className="locker__img">
        <img src="images/pipelock.png" className='locker__img-pipelock' alt='pipelock'/>
        <img src="images/pipelock.png" className='locker__img-pipelock pipelock2' alt='pipelock'/>
        <img src='images/locker-1.png' alt="Замок" className="locker__img-main" />
        <div className={
          isYellow ? 'locker__img-indicator yellow' : 'locker__img-indicator'
        }></div>
      </div>
      <div className="locker__bottom">
        <CanvasCircle 
          setHited={setIsHited} 
          changeColor={changeColor}
        />
        <div className="locker__counter">
          <p>{`${isHited} / ${maxCounter}`} </p>
        </div>
      </div>
    </div>
  );
};
