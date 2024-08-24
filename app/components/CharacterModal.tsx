import React from "react";
import { Character } from "../types/Character";
import Image from "next/image";

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-[#8B9D77] text-black p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-red-700 text-5xl"
        >
          ×
        </button>
        <h1 className="text-4xl font-semibold text-center mb-4">
          {character.name}
        </h1>
        <Image
          src={character.image}
          alt={character.name}
          width={400}
          height={400}
          className="object-cover mb-4 mx-auto"
        />
        <p className="text-3xl">
          <strong>Status:</strong> {character.status}
        </p>
        <p className="text-3xl">
          <strong>Species:</strong> {character.species}
        </p>
        <p className="text-3xl">
          <strong>Gender:</strong> {character.gender}
        </p>
        <p className="text-3xl">
          <strong>Origin:</strong> {character.origin.name}
        </p>
        <p className="text-3xl">
          <strong>Location:</strong> {character.location.name}
        </p>
        <p className="text-3xl">
          <strong>Episodes:</strong> {character.episode.length}
        </p>
      </div>
    </div>
  );
};

export default CharacterModal;
