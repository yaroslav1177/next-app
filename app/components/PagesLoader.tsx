"use client";

import React, { useEffect, useState } from 'react';
import AnotherLoader from './AnotherLoader';

const PagesLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setContentVisible(true);
      }, 50); // Небольшая задержка перед показом контента
    }, 500); // Задержка 0.5 секунды

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <AnotherLoader />
      ) : (
        <div className={contentVisible ? "content-visible" : "content-hidden"}>
          {children}
        </div>
      )}
    </>
  );
};

export default PagesLoader;
