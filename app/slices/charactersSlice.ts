import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCharacters } from '../lib/api';
import { Character } from '../types/Character';

interface CharactersState {
  characters: Character[];
  totalFilteredCount: number;
  pageCount: number;
  currentPage: number;
  searchTerm: string;
  statusFilter: string | null;
  speciesFilter: string | null;
  genderFilter: string | null;
  isLoading: boolean;
  selectedCharacter: Character | null;
  visibleCards: number[];
}

const initialState: CharactersState = {
  characters: [],
  totalFilteredCount: 0,
  pageCount: 0,
  currentPage: 1,
  searchTerm: '',
  statusFilter: null,
  speciesFilter: null,
  genderFilter: null,
  isLoading: false,
  selectedCharacter: null,
  visibleCards: [],
};

export const loadCharacters = createAsyncThunk(
  'characters/loadCharacters',
  async ({ page, searchTerm, statusFilter, speciesFilter, genderFilter }: { page: number, searchTerm: string, statusFilter: string | null, speciesFilter: string | null, genderFilter: string | null }) => {
    const { characters, info } = await fetchCharacters(page, searchTerm, statusFilter, speciesFilter, genderFilter);
    return { characters, info };
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setSpeciesFilter: (state, action) => {
      state.speciesFilter = action.payload;
    },
    setGenderFilter: (state, action) => {
      state.genderFilter = action.payload;
    },
    setSelectedCharacter: (state, action) => {
      state.selectedCharacter = action.payload;
    },
    setVisibleCards: (state, action) => {
      state.visibleCards = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = '';
      state.statusFilter = null;
      state.speciesFilter = null;
      state.genderFilter = null;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCharacters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadCharacters.fulfilled, (state, action) => {
        state.characters = action.payload.characters;
        state.totalFilteredCount = action.payload.info.count;
        state.pageCount = action.payload.info.pages;
        state.isLoading = false;
      })
      .addCase(loadCharacters.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setSearchTerm,
  setStatusFilter,
  setSpeciesFilter,
  setGenderFilter,
  setSelectedCharacter,
  setVisibleCards,
  resetFilters,
} = charactersSlice.actions;

export default charactersSlice.reducer;
