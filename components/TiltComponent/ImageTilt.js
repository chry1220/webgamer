import clsx from 'clsx';
import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
const ImageTilt = ({ slug }) => {
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
    <div style={{ position: 'relative', zIndex: zIndex }} >
      <Tilt
        tiltReverse={true}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.8}
        scale={1.5}
      >
        <img
          src={showImage2 ? `https://webgamer.io/games/${slug}/${slug}-1.240x.85pc.webp` : `https://webgamer.io/games/${slug}/${slug}.240x.85pc.webp`}
          alt="Image"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="rounded-lg w-full h-auto"
        />
      </Tilt>
    </div>
  );
};

export default ImageTilt;