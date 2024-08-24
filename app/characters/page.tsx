"use client";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  loadCharacters,
  setSearchTerm,
  setStatusFilter,
  setSpeciesFilter,
  setGenderFilter,
  setSelectedCharacter,
  setVisibleCards,
  resetFilters,
} from "../slices/charactersSlice";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import CharacterCard from "../components/CharacterCard";
import CharacterFilters from "../components/CharacterFilters";
import Footer from "../components/Footer";
import CharacterModal from "../components/CharacterModal";
import BackToTop from "../components/BackToTop";

export default function CharactersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    characters,
    totalFilteredCount,
    pageCount,
    currentPage,
    searchTerm,
    statusFilter,
    speciesFilter,
    genderFilter,
    isLoading,
    selectedCharacter,
    visibleCards,
  } = useSelector((state: RootState) => state.characters);

  useEffect(() => {
    dispatch(
      loadCharacters({
        page: 1,
        searchTerm,
        statusFilter,
        speciesFilter,
        genderFilter,
      })
    );
  }, [searchTerm, statusFilter, speciesFilter, genderFilter, dispatch]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    dispatch(
      loadCharacters({
        page: selected + 1,
        searchTerm,
        statusFilter,
        speciesFilter,
        genderFilter,
      })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadMore = () => {
    if (currentPage < pageCount) {
      dispatch(
        loadCharacters({
          page: currentPage + 1,
          searchTerm,
          statusFilter,
          speciesFilter,
          genderFilter,
        })
      );
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch(
              setVisibleCards([
                ...visibleCards,
                parseInt(entry.target.getAttribute("data-id") || "0"),
              ])
            );
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
  }, [characters, dispatch, visibleCards]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 pt-[100px] flex-grow">
        <div className="md:mx-24">
          <h1 className="mb-4 text-7xl animate-bounceInLeft">
            Rick and Morty Characters
          </h1>

          <CharacterFilters
            searchTerm={searchTerm}
            setSearchTerm={(term) => dispatch(setSearchTerm(term))}
            statusFilter={statusFilter}
            setStatusFilter={(filter) => dispatch(setStatusFilter(filter))}
            speciesFilter={speciesFilter}
            setSpeciesFilter={(filter) => dispatch(setSpeciesFilter(filter))}
            genderFilter={genderFilter}
            setGenderFilter={(filter) => dispatch(setGenderFilter(filter))}
            resetFilters={() => dispatch(resetFilters())}
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
              characters.map((char) => (
                <div
                  key={char.id}
                  className={`character-card animate__animated ${
                    visibleCards.includes(char.id)
                      ? "animate__animated animate__pulse"
                      : ""
                  }`}
                  data-id={char.id}
                >
                  <CharacterCard
                    character={char}
                    onViewDetails={() => dispatch(setSelectedCharacter(char))}
                  />
                </div>
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
          onClose={() => dispatch(setSelectedCharacter(null))}
        />
      )}

      <BackToTop />
    </div>
  );
}
