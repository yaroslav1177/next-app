export default function Home() {
  return (
    <div className="homePage flex flex-col items-center justify-center min-h-screen">
      <p
        className="text-center uppercase text-[40px] md:text-[80px] font-bold pl-3 animate-rotateIn"
        style={{
          color: "#EDC5AB",
          textShadow: `
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000,
            -2px -2px 0 #000,
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
          `,
        }}
      >
        Welcome to the <br /> Rick and Morty universe
      </p>
      <a
        href="/characters"
        className="inline-block text-center mt-[200px] text-[30px] hover:text-[#EDC5AB] hover:bg-[#8B9D77] hover:border-black ml-3 border-2 px-4 py-2 rounded-[50px] transition-all duration-500 ease-in-out animate-rotateIn"
        style={{
          color: "#EDC5AB",
          textShadow: `
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000,
            -2px -2px 0 #000,
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000
          `,
        }}
      >
        view all characters
      </a>
    </div>
  );
}
