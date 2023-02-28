import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss'

export const GameCard = ({title, tool, imgLink, navRoute}) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(navRoute);
  }

  return (
    <div className='card' onClick={handleClick}>
      <div className="card__header">
        <p className="card__title">
          {` ${title} `}
        </p>
        {tool && (
          <div className='card__tool'>
            {`#${tool}`}
          </div>
        )}
      </div>
      <img src={imgLink} draggable='false' alt="content image" className='card__img'/>
      <button className='card__btn'>Play</button>
    </div>
  );
};
