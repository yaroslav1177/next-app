import Image from "next/image";
import { fetchCharacters } from "./lib/api";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  location: {
    name: string;
  };
};

export default async function HomePage() {
  const characters = await fetchCharacters();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rick and Morty Characters</h1>
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12"
      >
        {characters.map((char: Character) => (
          <div
            key={char.id}
            className="border-4 border-[#37745B] p-0 pb-4 rounded-[25px] bg-[#8B9D77] text-black"
            style={{ width: "300px" }}
          >
            <div className="relative">
              <Image
                src={char.image}
                alt={char.name}
                width={500}
                height={500}
                className="object-cover w-full rounded-t-[25px]"
              />
              {(() => {
                if (char.status === "Dead") {
                  return (
                    <div className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded">
                      {char.status}
                    </div>
                  );
                } else if (char.status === "Alive") {
                  return (
                    <div className="absolute top-2 right-2 bg-green-600 text-white p-1 rounded">
                      {char.status}
                    </div>
                  );
                } else {
                  return (
                    <div className="absolute top-2 right-2 bg-gray-600 text-white p-1 rounded">
                      {char.status}
                    </div>
                  );
                }
              })()}
            </div>

            <div className="flex flex-col p-4">
              <h2 className="text-lg font-semibold mb-4 text-center">
                {char.name}
              </h2>
              <p className="text-xs">Last location:</p>
              <p className="mb-4">{char.location.name}</p>
              <a
                href={`/character/${char.id}`}
                className="text-[#EDC5AB] bg-[#37745B] hover:text-[#37745B] hover:bg-[#EDC5AB] border-2 border-[#EDC5AB] hover:border-[#37745B] rounded-[50px] flex items-center justify-center h-[50px]"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
