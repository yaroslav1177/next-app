// components/LottieLoader.tsx
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../public/Animation.json'; // Замените путь на ваш JSON-файл

const LottieLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="lottie-container">
      <div className='flex flex-col items-center gap-6 animate__animated animate__zoomIn'>
      <Lottie options={defaultOptions} height={400} width={400} />
      <p className='text-2xl md:text-8xl'>wait a second...</p>
      </div>
    </div>
  );
};

export default LottieLoader;
