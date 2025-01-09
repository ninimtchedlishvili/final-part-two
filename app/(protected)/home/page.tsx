import Footer from "@/app/(protected)/components/layout/Footer";
import Page from "../movie/Page";

export default async function Home() {
  let movies = [];
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1",
      { next: { revalidate: 10 } }
    );
    const response = await data.json();
    movies = response || [];
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }

  return (
    <div className="bg-gray-900">
      <Page movies={movies} />
      <Footer />
    </div>
  );
}
