import React from 'react';
import { Runes, Todo } from '../../entities';

export const RunesPage = () => {
  return (
    <div className='gameBg'>
      <Todo 
        title='Magic'
        subTitle='Find two identical runes'
      />
      <Runes />
    </div>
  );
};
