import Image from 'next/image';
import { fetchCharacter } from '../../lib/api';

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: string[];
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CharacterPage({ params }: PageProps) {
  const { id } = params;

  if (!id) return <div>Loading...</div>;

  try {
    const character = await fetchCharacter(Number(id));
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
        <Image
          src={character.image}
          alt={character.name}
          width={500}
          height={500}
          className="object-cover mb-4"
        />
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Species:</strong> {character.species}</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Origin:</strong> {character.origin.name}</p>
        <p><strong>Location:</strong> {character.location.name}</p>
        <p><strong>Episodes:</strong> {character.episode.length}</p>
      </div>
    );
  } catch (error) {
    return <div>Error loading character data.</div>;
  }
}
