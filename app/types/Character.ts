export type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
  episode: string[];
};
