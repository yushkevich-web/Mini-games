import React from 'react';
import { Todo } from '../../entities';
import ChickenDrag from '../../entities/chicken/ChickenDrag';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

export const ChickenPage = () => {
  return (
    <DndProvider backend={HTML5Backend}> 
      <div className='gameBg'>
        <Todo 
          title='Chicki'
          subTitle='Collect the entire chicken in a plastic container'
        />
        <ChickenDrag />
      </div>
    </DndProvider>
  );
};
