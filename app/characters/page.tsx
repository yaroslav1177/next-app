"use client";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { fetchCharacters } from "../lib/api";
import { Character } from "../types/Character";
import CharacterCard from "../components/CharacterCard";
import CharacterFilters from "../components/CharacterFilters";
import Footer from "../components/Footer";
import CharacterModal from "../components/CharacterModal";
import BackToTop from "../components/BackToTop";
import PagesLoader from "../components/PagesLoader";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [speciesFilter, setSpeciesFilter] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

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
      setCharacters((prev) =>
        append ? [...prev, ...fetchedCharacters] : fetchedCharacters
      );
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleCards((prev) => [
            ...prev,
            parseInt(entry.target.getAttribute('data-id') || '0'),
          ]);
        }
      });
    }, {
      threshold: 0.1,
    });

    const elements = document.querySelectorAll(".character-card");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [characters]);

  return (
    <PagesLoader >
          <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 pt-[100px] flex-grow">
        <div className="md:mx-24">
          <h1 className="mb-4 text-7xl animate-bounceInLeft">
            Rick and Morty Characters
          </h1>

          <CharacterFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            speciesFilter={speciesFilter}
            setSpeciesFilter={setSpeciesFilter}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
            resetFilters={resetFilters}
          />

          <div className="mb-4 text-2xl">
            {isLoading
              ? "Loading..."
              : `Found ${totalFilteredCount} characters`}
          </div>
        </div>

        <div className="mx-24">
          <div className="grid justify-items-center gap-y-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {characters && characters.length > 0 ? (
              characters.map((char: Character) => (
                <div
                key={char.id}
                className={`character-card animate__animated ${
                  visibleCards.includes(char.id) ? 'animate__animated animate__pulse' : ''
                }`}
                data-id={char.id}
              ><CharacterCard
              character={char}
              onViewDetails={() => setSelectedCharacter(char)}
            /></div>

              ))
            ) : (
              <div className="text-center text-lg">No search results found</div>
            )}
          </div>
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
              pageClassName={"page-item mx-1 hidden md:block"}
              pageLinkClassName={
                "page-link px-3 py-1 border border-gray-300 rounded"
              }
              previousClassName={"page-item"}
              previousLinkClassName={
                "page-link px-3 py-1 border border-gray-300 rounded"
              }
              nextClassName={"page-item"}
              nextLinkClassName={
                "page-link px-3 py-1 border border-gray-300 rounded"
              }
              breakClassName={"page-item"}
              breakLinkClassName={
                "page-link px-3 py-1 border border-gray-300 rounded"
              }
              activeClassName={"bg-[#EDC5AB] text-black"}
            />
          </>
        )}
      </div>
      <Footer />

      {selectedCharacter && (
        <CharacterModal 
        character={selectedCharacter} 
        onClose={closeModal} 
      />
      )}

      <BackToTop />
    </div>
    </PagesLoader>
  );
}
