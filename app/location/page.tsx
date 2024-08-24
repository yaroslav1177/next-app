"use client";
import React, { useEffect, useState } from "react";
import { InputGroup } from "../components/InputGroup";
import CharacterCard from "../components/CharacterCard";
import { Character } from "../types/Character";

export default function Location() {
  const [results, setResults] = useState<Character[]>([]);
  const [info, setInfo] = useState<{ name: string; dimension: string; type: string }>({
    name: "",
    dimension: "",
    type: "",
  });
  const { dimension, type, name } = info;
  const [number, setNumber] = useState(1);

  const api = `https://rickandmortyapi.com/api/location/${number}`;

  useEffect(() => {
    (async function () {
      const data = await fetch(api).then((res) => res.json());
      setInfo({
        name: data.name,
        dimension: data.dimension,
        type: data.type,
      });

      const characterData = await Promise.all(
        data.residents.map((x: string) => {
          return fetch(x).then((res) => res.json());
        })
      );
      setResults(characterData);
    })();
  }, [api]);

  return (
    <div className="container mx-auto p-4 pt-[100px]">
      <div className="mb-3">
        <h1 className="text-center mb-3 text-7xl">
          Location :{" "}
          <span className="text-primary">{name === "" ? "Unknown" : name}</span>
        </h1>
        <h5 className="text-center text-4xl">
          Dimension: {dimension === "" ? "Unknown" : dimension}
        </h5>
        <h6 className="text-center text-3xl">
          Type: {type === "" ? "Unknown" : type}
        </h6>
      </div>
      <div className="">
        <div className="flex flex-col items-center mb-4">
          <h4 className="text-center mb-4 text-3xl">Pick Location</h4>
          <InputGroup name="Location" changeID={setNumber} total={126} />
        </div>
        <div className="mx-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
            {results.length > 0 ? (
              results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))
            ) : (
              <div className="text-center text-xl col-span-full">
                No characters found for this location.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
