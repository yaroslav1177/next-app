// components/ClientLoader.tsx
"use client"; // Указывает, что этот файл является клиентским

import React, { useEffect, useState } from 'react';
// import Loader from './Loader'; // Проверьте путь к Loader
import AnotherLoader from './AnotherLoader';

const PagesLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Задержка 2 секунды

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <AnotherLoader /> : <>{children}</>}
    </>
  );
};

export default PagesLoader;
