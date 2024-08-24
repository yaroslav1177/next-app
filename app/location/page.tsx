"use client";
import React, { useEffect, useState } from "react";
import { InputGroup } from "../components/InputGroup";
import CharacterCard from "../components/CharacterCard";
import { Character } from "../types/Character";
import Footer from "../components/Footer";
import CharacterModal from "../components/CharacterModal";

export default function Location() {
  const [results, setResults] = useState<Character[]>([]);
  const [info, setInfo] = useState<{
    name: string;
    dimension: string;
    type: string;
  }>({
    name: "",
    dimension: "",
    type: "",
  });
  const { dimension, type, name } = info;
  const [number, setNumber] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

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

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [
              ...prev,
              parseInt(entry.target.getAttribute("data-id") || "0"),
            ]);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll(".character-card");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [results]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 pt-[100px] flex-grow">
        <div className="mb-3">
          <h1 className="text-center mb-3 text-7xl animate__animated animate__rollIn">
            Location :{" "}
            <span className="text-primary">
              {name === "" ? "Unknown" : name}
            </span>
          </h1>
          <h5 className="text-center text-4xl animate__animated animate__rollIn">
            Dimension: {dimension === "" ? "Unknown" : dimension}
          </h5>
          <h6 className="text-center text-3xl animate__animated animate__rollIn">
            Type: {type === "" ? "Unknown" : type}
          </h6>
        </div>
        <div className="">
          <div className="flex flex-col items-center mb-4">
            <h4 className="text-center mb-4 text-3xl animate__animated animate__rollIn">
              Pick Location
            </h4>
            <InputGroup name="Location" changeID={setNumber} total={126} />
          </div>
          <div className="mx-24">
            <div className="grid justify-items-center gap-y-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {results.length > 0 ? (
                results.map((character) => (
                  <div
                    key={character.id}
                    className={`character-card animate__animated ${
                      visibleCards.includes(character.id)
                        ? "animate__animated animate__pulse"
                        : ""
                    }`}
                    data-id={character.id}
                  >
                    <CharacterCard
                      character={character}
                      onViewDetails={() => setSelectedCharacter(character)}
                    />
                  </div>
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
      <Footer />

      {selectedCharacter && (
        <CharacterModal character={selectedCharacter} onClose={closeModal} />
      )}
    </div>
  );
}
