"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import { fetchCharacters } from "../lib/api";
import { Character } from "../types/Character";



export default function HomePageClient() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [speciesFilter, setSpeciesFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadCharacters = async (page: number, append: boolean = false) => {
    setIsLoading(true);
    try {
      const { characters: fetchedCharacters, info } = await fetchCharacters(
        page,
        searchTerm,
        statusFilter,
        speciesFilter,
        genderFilter
      );
      setCharacters((prev) => append ? [...prev, ...fetchedCharacters] : fetchedCharacters);
      setTotalFilteredCount(fetchedCharacters.length > 0 ? info.count : 0);
      setPageCount(fetchedCharacters.length > 0 ? info.pages : 0);
    } catch (error) {
      console.error("Failed to load characters:", error);
      setTotalFilteredCount(0);
      setPageCount(0);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadCharacters(1);
  }, [searchTerm, statusFilter, speciesFilter, genderFilter]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
    loadCharacters(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadMore = () => {
    if (currentPage < pageCount) {
      loadCharacters(currentPage + 1, true);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter(null);
    setSpeciesFilter(null);
    setGenderFilter(null);
    setCurrentPage(1);
    loadCharacters(1);
  };

  return (
    <div className="container mx-auto p-4 pt-[100px]">
      <h1 className="font-bold mb-4 text-6xl">Rick and Morty Characters</h1>
      <input
        type="text"
        placeholder="Search characters..."
        className="w-[300px] p-2 mb-4 border text-3xl border-gray-300 rounded text-black placeholder:text-slate-400 focus:border-inherit bg-[#EDC5AB] focus:outline-none focus:ring focus:ring-violet-300"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="mb-4 flex space-x-4">
        <select
          onChange={(e) => setStatusFilter(e.target.value || null)}
          className="p-2 border border-gray-300 rounded text-black placeholder:text-slate-400 focus:border-inherit bg-[#EDC5AB] focus:outline-none focus:ring focus:ring-violet-300 text-3xl cursor-pointer"
          value={statusFilter || ""}
        >
          <option value="">All Statuses</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          onChange={(e) => setSpeciesFilter(e.target.value || null)}
          className="p-2 border border-gray-300 rounded text-black placeholder:text-slate-400 focus:border-inherit bg-[#EDC5AB] focus:outline-none focus:ring focus:ring-violet-300 text-3xl cursor-pointer"
          value={speciesFilter || ""}
        >
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Poopybutthole">Poopybutthole</option>
          <option value="Mythological">Mythological</option>
          <option value="Animal">Animal</option>
          <option value="Disease">Disease</option>
          <option value="Cronenberg">Cronenberg</option>
          <option value="Unknown">Unknown</option>
        </select>

        <select
          onChange={(e) => setGenderFilter(e.target.value || null)}
          className="p-2 border border-gray-300 rounded text-black placeholder:text-slate-400 focus:border-inherit bg-[#EDC5AB] focus:outline-none focus:ring focus:ring-violet-300 text-3xl cursor-pointer"
          value={genderFilter || ""}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        <button
          onClick={resetFilters}
          className="p-2 border border-gray-300 rounded bg-[#EDC5AB] hover:bg-[#37745B] hover:text-[#EDC5AB] text-red-700 text-3xl"
        >
          Reset Filters
        </button>
      </div>

      <div className="mb-4 text-2xl">
        {isLoading
          ? "Loading..."
          : `Found ${totalFilteredCount} characters`}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
        {characters && characters.length > 0 ? (
          characters.map((char: Character) => (
<div
  key={char.id}
  className="border-4 border-[#37745B] p-0 pb-4 rounded-[25px] bg-[#8B9D77] text-black flex flex-col justify-between"
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
    {char.status === "Dead" && (
      <div className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded">
        {char.status}
      </div>
    )}
    {char.status === "Alive" && (
      <div className="absolute top-2 right-2 bg-green-600 text-white p-1 rounded">
        {char.status}
      </div>
    )}
    {!["Alive", "Dead"].includes(char.status) && (
      <div className="absolute top-2 right-2 bg-gray-600 text-white p-1 rounded">
        {char.status}
      </div>
    )}
  </div>

  <div className="flex flex-col p-4 flex-grow">
    <h2 className="text-3xl font-semibold mb-4 text-center">
      {char.name}
    </h2>
    <p className="text-1xl">Last location:</p>
    <p className="mb-4 text-3xl">{char.location.name}</p>
    <div className="mt-auto">
      <a
        href={`/character/${char.id}`}
        className="text-[#EDC5AB] bg-[#37745B] hover:text-[#37745B] hover:bg-[#EDC5AB] border-2 border-[#EDC5AB] hover:border-[#37745B] rounded-[50px] flex items-center justify-center h-[50px] text-3xl transition-all duration-500 ease-in-out"
      >
        View Details
      </a>
    </div>
  </div>
</div>

          ))
        ) : (
          <div className="text-center text-lg">No search results found</div>
        )}
      </div>

      {characters && characters.length > 0 && (
        <>
          {currentPage < pageCount && (
            <button
              onClick={handleLoadMore}
              className="mt-6 mx-auto px-4 py-2 text-[#EDC5AB] bg-[#37745B] hover:text-[#37745B] hover:bg-[#EDC5AB] border-2 border-[#EDC5AB] hover:border-[#37745B] rounded flex justify-center items-center"
            >
              Load More
            </button>
          )}
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex justify-center mt-4"}
            pageClassName={"page-item mx-1"}
            pageLinkClassName={"page-link px-3 py-1 border border-gray-300 rounded"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link px-3 py-1 border border-gray-300 rounded"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link px-3 py-1 border border-gray-300 rounded"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link px-3 py-1 border border-gray-300 rounded"}
            activeClassName={"bg-[#EDC5AB] text-black"}
          />
        </>
      )}
    </div>
  );
}
