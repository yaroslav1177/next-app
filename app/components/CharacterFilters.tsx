import React from "react";

interface CharacterFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string | null;
  setStatusFilter: (value: string | null) => void;
  speciesFilter: string | null;
  setSpeciesFilter: (value: string | null) => void;
  genderFilter: string | null;
  setGenderFilter: (value: string | null) => void;
  resetFilters: () => void;
}

export default function CharacterFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  speciesFilter,
  setSpeciesFilter,
  genderFilter,
  setGenderFilter,
  resetFilters,
}: CharacterFiltersProps) {
  return (
    <div className="animate-bounceInLeft">
      <input
        type="text"
        placeholder="Search characters..."
        className="w-[300px] p-2 mb-4 border text-3xl border-gray-300 rounded text-black placeholder:text-slate-400 focus:border-inherit bg-[#EDC5AB] focus:outline-none focus:ring focus:ring-violet-300"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:space-x-4">
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
    </div>
  );
}
