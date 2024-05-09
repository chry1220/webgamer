import clsx from 'clsx';
import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
const ImageTilt = ({ slug }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showImage2, setShowImage2] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => {
      setShowImage2(true);
    }, 300); // Delay before showing the second image
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowImage2(false);
  };

  return (
    <div>
      <Tilt
        tiltReverse={true}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        scale={1.1}
        glareMaxOpacity={0.8}
        wid
      >
        <img
          src={showImage2 ? `https://webgamer.io/games/${slug}/${slug}-1.240x.85pc.webp` : `https://webgamer.io/games/${slug}/${slug}.240x.85pc.webp`}
          alt="Image"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={isHovered ? "rounded-lg" : "rounded-lg"}
        />
      </Tilt>
    </div>
  );
};

export default ImageTilt;