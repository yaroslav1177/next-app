"use client";
import React, { useEffect, useState } from "react";
import { InputGroup } from "../components/InputGroup";
import CharacterCard from "../components/CharacterCard";
import { Character } from "../types/Character";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Episode() {
  const [results, setResults] = useState<Character[]>([]);
  const [info, setInfo] = useState<{
    air_date: string;
    episode: string;
    name: string;
  }>({
    air_date: "",
    episode: "",
    name: "",
  });
  const { air_date, episode, name } = info;
  const [id, setID] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const api = `https://rickandmortyapi.com/api/episode/${id}`;

  useEffect(() => {
    (async function () {
      const data = await fetch(api).then((res) => res.json());
      setInfo(data);

      const characterData = await Promise.all(
        data.characters.map((x: string) => {
          return fetch(x).then((res) => res.json());
        })
      );
      setResults(characterData);
    })();
  }, [api]);

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 pt-[100px] flex-grow">
        <div className="mb-3">
          <h1 className="text-center mb-3 text-7xl">
            Episode name :{" "}
            <span className="text-primary">
              {name === "" ? "Unknown" : name}
            </span>
          </h1>
          <h5 className="text-center text-4xl">
            Air Date: {air_date === "" ? "Unknown" : air_date}
          </h5>
        </div>
        <div className="">
          <div className="flex flex-col items-center mb-4">
            <h4 className="text-center mb-4 text-3xl">Pick Episode</h4>
            <InputGroup name="Episode" changeID={setID} total={51} />
          </div>
          <div className="mx-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
              {results.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onViewDetails={() => setSelectedCharacter(character)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
        <Footer />

        {/* Modal */}
        {selectedCharacter && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 ">
            <div className="bg-[#8B9D77] text-black p-6 rounded-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-1 right-2 text-red-700 text-5xl"
              >
                ×
              </button>
              <h1 className="text-4xl font-semibold text-center mb-4">
                {selectedCharacter.name}
              </h1>
              <Image
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                width={400}
                height={400}
                className="object-cover mb-4 mx-auto"
              />
              <p className="text-3xl">
                <strong>Status:</strong> {selectedCharacter.status}
              </p>
              <p className="text-3xl">
                <strong>Species:</strong> {selectedCharacter.species}
              </p>
              <p className="text-3xl">
                <strong>Gender:</strong> {selectedCharacter.gender}
              </p>
              <p className="text-3xl">
                <strong>Origin:</strong> {selectedCharacter.origin.name}
              </p>
              <p className="text-3xl">
                <strong>Location:</strong> {selectedCharacter.location.name}
              </p>
              <p className="text-3xl">
                <strong>Episodes:</strong> {selectedCharacter.episode.length}
              </p>
            </div>
          </div>
        )}
    </div>
  );
}
