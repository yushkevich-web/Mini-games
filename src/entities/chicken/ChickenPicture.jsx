import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemType } from './ItemType';

export default function ChickenPicture({url, index}) {

  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemType.CHICKEN,
    item: {picIndex: index},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }))

  return (
    <div>
      <img 
        ref={drag}
        src={url} 
        alt="chicken" 
        style={{opacity: isDragging ? 0.4 : 1}}
      />
    </div>
  );
}
