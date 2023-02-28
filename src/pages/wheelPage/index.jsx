import React from 'react';
import { Todo, Wheel } from '../../entities'

export const WheelPage = () => {
  return (
    <div className='gameBg'>
      <Todo 
        title='Aquaman'
        subTitle='Open the tap by joining the red marks'
      />
      <Wheel />
    </div>
  );
};