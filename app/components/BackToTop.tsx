import React, { useEffect, useState } from "react";
import Image from "next/image";

const BackToTop: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    showBackToTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-[#8B9D77] hover:bg-[#EDC5AB] hidden sm:block w-[85px] h-[85px] border-2 border-[#EDC5AB] hover:border-[#37745B] rounded-full shadow-lg transition-opacity duration-300 animate__animated animate__zoomInRight"
      >
        <Image src="/arrow-up.png" alt="back to top" width={100} height={100} />
      </button>
    )
  );
};

export default BackToTop;
