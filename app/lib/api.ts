// export async function fetchCharacters(page: number = 1, searchTerm: string = "") {
//   const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${searchTerm}`);
//   const data = await res.json();
//   return {
//     characters: data.results,
//     info: data.info,
//   };
// }

export async function fetchCharacters(
  page: number = 1,
  searchTerm: string = "",
  status: string | null = null,
  species: string | null = null,
  gender: string | null = null
) {
  let url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchTerm}`;

  if (status) {
    url += `&status=${status}`;
  }
  if (species) {
    url += `&species=${species}`;
  }
  if (gender) {
    url += `&gender=${gender}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return {
    characters: data.results,
    info: data.info,
  };
}



export async function fetchCharacter(id: number) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await res.json();
  return data;
}
