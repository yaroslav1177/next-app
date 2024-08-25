"use client";

import React, { useEffect, useState } from 'react';
import LottieLoader from './components/Loader';

const ClientLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <LottieLoader /> : <>{children}</>}
    </>
  );
};

export default ClientLoader;
