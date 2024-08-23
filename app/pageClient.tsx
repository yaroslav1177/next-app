"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { fetchCharacters } from "./lib/api"; // Импортируйте свою функцию загрузки данных

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  location: {
    name: string;
  };
};

type CharacterResponse = {
  characters: Character[];
  info: {
    count: number;
    pages: number;
  };
};

export default function HomePageClient() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadCharacters = async (page: number, search: string) => {
    setIsLoading(true);
    try {
      const { characters: fetchedCharacters, info }: CharacterResponse = await fetchCharacters(page, search);
      setCharacters((prev) => page === 1 ? fetchedCharacters : [...prev, ...fetchedCharacters]);
      setTotalCount(info.count);
      setPageCount(info.pages);
      if (!search) {
        setTotalFilteredCount(info.count);
      }
    } catch (error) {
      console.error("Failed to load characters:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadCharacters(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  useEffect(() => {
    if (characters) {
      const results = characters.filter((char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCharacters(results);
      setTotalFilteredCount(results.length);
    }
  }, [characters, searchTerm]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rick and Morty Characters</h1>

      {/* Поисковая строка */}
      <input
        type="text"
        placeholder="Search characters..."
        className="w-[300px] p-2 mb-4 border border-gray-300 rounded text-black placeholder:text-slate-400 focus:border-inherit bg-[#EDC5AB] focus:outline-none focus:ring focus:ring-violet-300"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }}
      />

      {/* Счетчик найденных карточек */}
      <div className="mb-4">
        {isLoading
          ? "Loading..."
          : `Found ${searchTerm ? totalFilteredCount : totalCount} characters`}
      </div>

      {/* Карточки */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((char: Character) => (
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
          ))
        ) : (
          <div className="text-center text-lg">No search results found</div>
        )}
      </div>

      {/* Кнопка "Load More" и Пагинация */}
      {filteredCharacters.length > 0 && (
        <>
          {currentPage < pageCount && !isLoading && (
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="my-6 mx-auto px-4 py-2 text-[#EDC5AB] bg-[#37745B] hover:text-[#37745B] hover:bg-[#EDC5AB] border-2 border-[#EDC5AB] hover:border-[#37745B] rounded flex justify-center items-center "
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

