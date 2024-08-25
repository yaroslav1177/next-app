import Image from "next/image";
import { Character } from "../types/Character";

interface CharacterCardProps {
  character: Character;
  onViewDetails: () => void;
}

export default function CharacterCard({ character, onViewDetails }: CharacterCardProps) {
  return (
    <div
      className="dynamic-border border-6 border-[#37745B] p-0 pb-4 rounded-[25px] bg-[#8B9D77] text-black flex flex-col justify-between transform transition-transform duration-300 hover:scale-105"
      style={{ width: "300px", height: "570px" }}
    >
      <div className="relative">
        <Image
          src={character.image}
          alt={character.name}
          width={500}
          height={500}
          className="object-cover w-full rounded-t-[15px]"
        />
        {character.status === "Dead" && (
          <div className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded">
            {character.status}
          </div>
        )}
        {character.status === "Alive" && (
          <div className="absolute top-2 right-2 bg-green-600 text-white p-1 rounded">
            {character.status}
          </div>
        )}
        {!["Alive", "Dead"].includes(character.status) && (
          <div className="absolute top-2 right-2 bg-gray-600 text-white p-1 rounded">
            {character.status}
          </div>
        )}
      </div>

      <div className="flex flex-col p-4 flex-grow">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          {character.name}
        </h2>
        <p className="text-1xl">Last location:</p>
        <p className="mb-4 text-3xl">{character.location.name}</p>
        <div className="mt-auto">
          <button
            onClick={onViewDetails}
            className="text-[#EDC5AB] bg-[#37745B] hover:text-[#37745B] hover:bg-[#EDC5AB] border-2 border-[#EDC5AB] hover:border-[#37745B] rounded-[50px] flex items-center justify-center h-[50px] text-3xl transition-all duration-500 ease-in-out w-full"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
