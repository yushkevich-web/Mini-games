import React from 'react';

/**
 * @param number Pseudorandom number generation 
*/

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
};
