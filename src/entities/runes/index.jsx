import React, { useMemo, useState } from 'react';
import { shuffle } from '../../shared/';

import './style.scss'

let secondPicture = null;

const runesArr = shuffle([
  '/images/rune-aesc.png',
  "/images/rune-beorc.png",
  "/images/rune-born.png",
  "/images/rune-eeoh.png",
  "/images/rune-feoh.png",
  "/images/rune-peoro.png",
  "/images/rune-rad.png",
  "/images/rune-eeoh.png",
  "/images/rune-m.png"
])

export const Runes = () => {
  const [isClickedIndex, setIsClickedIndex] = useState( undefined )

  const handleClick = (e) => {
    let firstPicture = e.target;

    setIsClickedIndex( Number(firstPicture.id) )

    if(secondPicture){
      if(firstPicture.src === secondPicture.src && firstPicture.id != secondPicture.id){
        alert(true)
        window.location.reload()
      } else {
        alert(false)
        window.location.reload()
      }
    } else{
      secondPicture = firstPicture;
    }
  }



  return (
    <div className='runes'>
      {runesArr.map((runeItem, index) => <img className={isClickedIndex === index ? 'runes__item active' : 'runes__item'} src={runeItem} id={index} onClick={handleClick}/>)}
    </div>
  );
};
