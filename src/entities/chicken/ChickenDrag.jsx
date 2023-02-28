import React, {useState} from 'react';
import { useDrop } from 'react-dnd';
import { ItemType } from './ItemType';
import Picture from './ChickenPicture';
import { shuffle } from '../../shared/utils/shuffle';

import './chicken.scss'

import PicChick1 from '/images/chik1.png'
import PicChick2 from '/images/chik2.png'
import PicChick3 from '/images/chik3.png'
import Buck from '/images/buck.png'



function DropZone({ picIndex, droppedCollection, addImageToBoard }){
  const [{isOver}, drop] = useDrop(() => ({
    accept: ItemType.CHICKEN,
    drop: (item) => {
      if(item.picIndex !== picIndex) return;
      addImageToBoard(item.picIndex);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return <div ref={drop}>{droppedCollection[picIndex]}</div>;
}


export default function ChickenDrag() {
  const [board, setBoard] = useState([null, null, null]);
  const [PictureList, setPictureList] = useState( shuffle([
    <Picture url={PicChick1} index={2} key={1} />,
    <Picture url={PicChick2} index={0} key={2} />,
    <Picture url={PicChick3} index={1} key={3} />,
  ]))


  const addImageToBoard = (index) => {
    const pic = PictureList.find((x) => x.props.index === index);
    setPictureList((prev) => [...prev.filter((x) => x.props.index !== index)]);
    setBoard((prev) => {
      prev[pic.props.index] = pic; 
      return prev
    });
  };

  return (
    <>  
      <div className='chicken__pictures'>{PictureList}</div>
      <div className="chicken__board"> 
        <DropZone 
          key={11}
          picIndex={0}
          droppedCollection={board}
          addImageToBoard={addImageToBoard}
          className='asd'
        />
        <DropZone 
          key={12}
          picIndex={1}
          droppedCollection={board}
          addImageToBoard={addImageToBoard}
        />
        <DropZone 
          key={13}
          picIndex={2}
          droppedCollection={board}
          addImageToBoard={addImageToBoard}
        />
        <img src={Buck} alt="background buck"  className='chicken__board-bg'/>
      </div>
    </>
  );
}
