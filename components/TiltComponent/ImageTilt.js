import clsx from 'clsx';
import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
const ImageTilt = ({game}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showImage2, setShowImage2] = useState(false);
  const [zIndex, setZIndex] = useState(0);
  const handleMouseEnter = () => {
    setIsHovered(true);
    setZIndex(100);
    setTimeout(() => {
      setShowImage2(true);
    }, 300); // Delay before showing the second image
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowImage2(false);
    setZIndex(0);
  };

  return (
    <div style={{ position: 'relative', zIndex: zIndex }} className='w-full h-full' >
      <Tilt
        tiltReverse={true}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.8}
        scale={1.5}
        className='w-full, h-full'
      >
        {
          game.detailedDeveloper &&
            game.detailedDeveloper.superficialGames &&
            game.detailedDeveloper.superficialGames.find(g => g.slug == game.slug).specialAttribute == "NEW" ?
            <div class="new-game">🎉 NEW</div> : null
        }
        <div className='smooth-container'>
          <img
            src={`https://webgamer.io/games/${game.slug}/${game.slug}.240x.85pc.webp`}
            alt="Image"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="initial-image rounded-lg"
          />
          <img
            src={`https://webgamer.io/games/${game.slug}/${game.slug}-1.240x.85pc.webp`}
            alt="Image"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="hover-image rounded-lg"
          />
          <div className='game-title hover-image'>
            <span className='game-background'>{game.name}</span>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default ImageTilt;