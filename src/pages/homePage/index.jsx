import React from 'react';
import './style.scss'
import { Header } from '../../widgets';
import { GameCard } from '../../entities'

// import {ReactComponent as DiscordIcon} from '../../../public/icons/telegram.svg';

export const HomePage = () => {
  return (
    <div className='header__wrapper'>
      <Header
        name='Kiryl Yushkevich'
      >   
      </Header>
      <div className="gameCard__wrapper">
        <GameCard 
          title='Cracker'
          tool='canvas'
          imgLink='images/locker-img.png'
          navRoute='/locker'
        />
        <GameCard 
          title='Chicki'
          tool='drag & drop'
          imgLink='images/chiki-card.png'
          navRoute='/chicken'
        />
        <GameCard 
          title='Aquaman'
          imgLink='images/aquaman-card.png'
          navRoute='/wheel'
        />
        <GameCard 
          title='Mazy'
          tool='canvas'
          imgLink='images/mazy-card.png'
          navRoute='/maze'
        />
        <GameCard 
          title='Magic'
          imgLink='images/magic-card.png'
          navRoute='/runes'
        />
      </div>
    </div>
  );
};
