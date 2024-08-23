import { fetchCharacters } from "./lib/api";
import HomePageClient from "./pageClient";

export default async function HomePage() {
  const characters = await fetchCharacters();

  return (
    <HomePageClient />
  );
}
