import React, { useEffect, useState } from 'react';

function CanvasCircle({setHited, changeColor}) {
  let [isIntersect, setIsIntersect] = useState(false);

  const canvasRef = React.useRef(null);

  const handleKeyDown = (e) => {
    if(e.keyCode === 32 && isIntersect === true){
      setHited((prev) => prev + 1)
      changeColor()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    const canvas = canvasRef.current;

    const ctx = canvas.getContext('2d');
    let cw = canvas.width;
    let ch = canvas.height;

    
    class Circle {
      data = {
        radius: 30, 
      }
      constructor(data){
        this.data = {...this.data, ...data} 
      }
  
      circleAnimated() {
        this.data.angleY += Math.PI * 0.02;
        this.data.angleX += Math.PI / 2 * 0.02;
  
        this.data.x = cw/2 + 200 * Math.sin(this.data.angleX)
        this.data.y = ch/2 + 30 * Math.cos(this.data.angleY)
  
        ctx.beginPath();
        ctx.arc( this.data.x, this.data.y, this.data.radius, 0, Math.PI * 2,false );
        ctx.fillStyle = "white"
        ctx.fill();
      }

      circleCenter() {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.arc(this.data.x, this.data.y, this.data.radius, 0, Math.PI * 2, false);
        ctx.stroke();
      }

      circleShadow() {
        ctx.beginPath();
        ctx.fillStyle = '#424546';
        ctx.arc(this.data.x, this.data.y, this.data.radius, 0, Math.PI * 2, false);
        ctx.fill();
      }

      draw(  ) {
        switch ( this.data.type ) {
            case 'circleCenter':
              return this.circleCenter()
            case 'circleAnimated':
              return this.circleAnimated()
            case 'circleShadow':
              this.circleShadow()
              break;
            default: return this.circleCenter()
        }
      }
    }

    let circles = [];
    circles.push(new Circle({x: 500, y: 95, angleX: 0, angleY: 0,  type: 'circleShadow' } ) );
    circles.push(new Circle({x: 100, y: 95, angleX: 0, angleY: 0,  type: 'circleShadow' } ) );
    circles.push(new Circle({x: cw / 2, y: ch / 2 + 30, type: 'circleCenter' } ) );
    circles.push(new Circle({radius: 20, angleX: 0, angleY: 0,  type: 'circleAnimated' } ) );

    const minX = circles[2].data.x - circles[2].data.radius
    const maxX = circles[2].data.x + circles[2].data.radius
    const minY = circles[2].data.y - circles[2].data.radius
    const maxY = circles[2].data.y + circles[2].data.radius


    function animate3() {  
    
      requestAnimationFrame(animate3)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      circles.forEach(item => {
          item.draw( )
      });
  
      if( circles[ 3 ].data.x > minX && circles[ 3 ].data.x < maxX && circles[ 3 ].data.y > minY && circles[ 3 ].data.y < maxY ) {
        isIntersect = true;
      } else{
        isIntersect = false;
      }

    }
    animate3();

  }, [])



  return (
    <canvas id='canvasHack' ref={canvasRef} width="600" height="250" />
  );
}

export default CanvasCircle;