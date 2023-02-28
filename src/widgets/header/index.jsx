import React from 'react';

import './style.scss'

export const Header = ({name, children}) => {
  return (
    <div className='header'>
      <p className='header__name'>
        {name}
      </p>
      <div className="header__media">
        {children}
      </div>
    </div>
  );
};
