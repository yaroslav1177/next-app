"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="w-full h-20 fixed top-0 left-0 z-10 bg-[#8B9D77] border-b-4 border-black">
      <div className="flex items-center justify-between px-3 md:px-12">
        <Link href="/" className={`flex my-auto text-black leading-[80px] text-[25px] md:text-[40px] lg:text-[60px] transition-all duration-300 ease-in-out hover:text-[#EDC5AB] animate__animated animate__zoomIn`}>
          Rick & Morty Universe
        </Link>
        <div>
          <div className="text-black flex items-center gap-1 md:gap-5 flex-col sm:flex-row sm:text-[20px] md:text-[22px] lg:text-[32px]  animate__animated animate__zoomIn">
            <Link href="/characters" className={`transition-transform  duration-300 ease-in-out transform ${
              pathname === '/characters' ? 'text-[#EDC5AB]' : 'hover:rotate-12 hover:text-[#EDC5AB]'
            }`}>
              Characters
            </Link>
            <Link href="/episode" className={`transition-transform  duration-300 ease-in-out transform ${
              pathname === '/episode' ? 'text-[#EDC5AB]' : 'hover:rotate-12 hover:text-[#EDC5AB]'
            }`}>
              Episode
            </Link>
            <Link href="/location" className={`transition-transform  duration-300 ease-in-out transform ${
              pathname === '/location' ? 'text-[#EDC5AB]' : 'hover:rotate-12 hover:text-[#EDC5AB]'
            }`}>
              Location
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
