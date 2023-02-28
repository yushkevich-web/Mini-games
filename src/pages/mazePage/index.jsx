import React from 'react';
import { Todo } from '../../entities';
import { Maze } from '../../widgets';

export const MazePage = () => {

  

  return(
    <div className='gameBg'>
    <Todo 
      title='Mazy'
      subTitle= {<p>Use the <span className="keyBtn">ARROWS</span> to get to the exit</p>}
    />
    <Maze 
      width={10}
      height={5}
    />
    </div>
  )
}