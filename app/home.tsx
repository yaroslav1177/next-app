export default function Home() {
  return (
    <div className="homePage flex flex-col items-center justify-center min-h-screen">
      <p className="text-center uppercase text-[50px] font-bold">
        Welcome to the <br /> Rick and Morty universe
      </p>
      <a
        href="/characters"
        className="inline-block text-center mt-[250px] text-[30px] border-2 px-4 py-2 rounded-[50px]"
      >
        view all characters
      </a>
    </div>
  );
}
