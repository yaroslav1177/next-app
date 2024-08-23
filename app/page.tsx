import Image from "next/image";
import { fetchCharacters } from "./lib/api";

type Character = {
  id: number;
  name: string;
  image: string;
};

export default async function HomePage() {
  const characters = await fetchCharacters();
  console.log('Fetched characters:', characters); 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rick and Morty Characters</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char: Character) => (
          <div key={char.id} className="border p-4 rounded">
            <Image
              src={char.image}
              alt={char.name}
              width={500} // Adjust the width as needed
              height={500} // Adjust the height as needed
              className="object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{char.name}</h2>
            <a href={`/character/${char.id}`} className="text-blue-500">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
