export async function fetchCharacters() {
  const res = await fetch('https://rickandmortyapi.com/api/character');
  const data = await res.json();
  return data.results;
}

export async function fetchCharacter(id: number) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await res.json();
  return data;
}
