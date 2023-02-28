import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MazeBuilder } from '../../entities';

import './style.scss'

export const Maze = ({width, height}) => {
  const mazeBuilder = new MazeBuilder(width, height);

  const [currentPos, setCurrentPos] = useState(mazeBuilder.entryPos) 
  const [maze, setMaze] = useState(mazeBuilder.maze);

  const navigate = useNavigate();

  const move = (x, y) => {
    if(!maze[y] || !maze[y][x]){
      return
    }

    const nextPos = maze[y][x]

    if(nextPos.type === 'wall'){
      return
    }
    if(nextPos.type === 'exit'){
      alert('Done');
      window.location.reload()
    }
  
    const newMaze = [...maze]

    if(newMaze[y][x].passed){
      newMaze[currentPos[0]][currentPos[1]] = {
        ...newMaze[y][x],
        passed: false  
      }
    } else{
      newMaze[y][x] = {
        ...newMaze[y][x],
        passed: !newMaze[y][x].passed
      }
    }
    setMaze(newMaze);
    setCurrentPos([y,x])
  }

  const handleKeyPress = (e) => {

    switch(e.key) {
      case 'ArrowUp': 
        move(currentPos[1],currentPos[0] -1)
        console.log('ArrowUp')
      break

      case 'ArrowDown': 
        move(currentPos[1],currentPos[0] + 1)
        console.log('ArrowDown')
      break

      case 'ArrowRight': 
        move(currentPos[1] + 1,currentPos[0])
        console.log('ArrowRight')
      break 

      case 'ArrowLeft': 
        move(currentPos[1] - 1,currentPos[0])
        console.log('ArrowLeft')
      break

      default:
        break
    }
  }

  const handleEsc= (e) => {
    if(e.key === 'Escape'){
      console.log('Esc')
      navigate('/')
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentPos])


  return (
    <div className='mazeWrapper'>
      {maze.map((items, indexCol) =>(
        <div key={indexCol} className="row">
          {items.map((cell, indexRow) => { 
            const selected = (indexCol === currentPos[0] && indexRow === currentPos[1]) ? 'selected' : '';
            const passed = cell.passed ? 'passed' : '';
            return (
            <div 
              key={indexRow} 
              className={`box ${cell.type} ${passed} ${selected}`}
            ></div>
          )})}
        </div>
      ))}
    </div>
  );
};
