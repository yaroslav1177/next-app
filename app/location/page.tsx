// "use client";
// import React, { useEffect, useState } from "react";
// import { InputGroup } from "../components/InputGroup";
// import CharacterCard from "../components/CharacterCard";
// import { Character } from "../types/Character";

// export default function Location() {
//   const [results, setResults] = useState<Character[]>([]);
//   const [info, setInfo] = useState<{ air_date: string; episode: string; name: string }>({
//     air_date: "",
//     episode: "",
//     name: "",
//   });
//   const { air_date, episode, name } = info;
//   const [number, setNumber] = useState<number>(1);

//   const api = `https://rickandmortyapi.com/api/location/${number}`;

//   useEffect(() => {
//     (async function () {
//       const data = await fetch(api).then((res) => res.json());
//       setInfo(data);

//       const characterData = await Promise.all(
//         data.characters.map((x: string) => {
//           return fetch(x).then((res) => res.json());
//         })
//       );
//       setResults(characterData);
//     })();
//   }, [api]);

//   return (
//     <div className="container mx-auto p-4 pt-[100px]">
//       <div className="mb-3">
//         <h1 className="text-center mb-3 text-7xl">
//           Location :{" "}
//           <span className="text-primary">{name === "" ? "Unknown" : name}</span>
//         </h1>
//         <h5 className="text-center text-4xl">
//           Dimension: {air_date === "" ? "Unknown" : air_date}
//         </h5>
//       </div>
//       <div className="">
//         <div className="flex flex-col items-center mb-4">
//           <h4 className="text-center mb-4 text-3xl">Pick Episode</h4>
//           <InputGroup name="Episode" changeID={setNumber} total={51} />
//         </div>
//         <div className="mx-20">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
//             {results.map((character) => (
//               <CharacterCard key={character.id} character={character} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
