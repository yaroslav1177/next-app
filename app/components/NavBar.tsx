export default function NavBar() {
  return (
    <div className="w-full h-[80px] fixed top-0 left-0 z-10 bg-[#8B9D77] border-b-4 border-black">
      <div className="flex items-center justify-between px-12">
        <a href="/" className="flex my-auto text-black leading-[80px] text-[60px]">Rick & Morty Universe</a>
        <div>
          <ul className="text-black flex items-center gap-5 text-[32px]">
            <li><a href="/characters">Characters</a></li>
            <li><a href="/episode">Episode</a></li>
            <li><a href="/location">Location</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
