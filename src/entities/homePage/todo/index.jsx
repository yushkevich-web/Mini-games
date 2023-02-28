import React from 'react';
import './todo.scss'

export const Todo = ({title, subTitle}) => {
  return (
    <div className='todo'>
      <p className="todo__title">{title}</p>
      <p className="todo__subtitle">{subTitle}</p>
      {/* <button className='todo__btn'>Понятно! Больше не показывать данное сообщение.</button> */}
    </div>
  );
};
