import React from 'react';
import { Todo } from '../../entities';
import { Locker } from '../../widgets';

export const LockerPage = () => {
  return (
    <div className='gameBg'>
      <Todo 
        title='Cracker'
        subTitle= {<p>Press <span className="keyBtn">SPACE</span> when the running circle is in the center</p>}
      />
      <Locker />
    </div>
  );
};
