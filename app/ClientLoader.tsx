// components/ClientLoader.tsx
"use client"; // Указывает, что этот файл является клиентским

import React, { useEffect, useState } from 'react';
import LottieLoader from './components/Loader';

const ClientLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Задержка 2 секунды

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <LottieLoader /> : <>{children}</>}
    </>
  );
};

export default ClientLoader;
