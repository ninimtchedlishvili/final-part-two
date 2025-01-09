import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Movies from "../movie/Movies";

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
      <Header />
      <Movies movies={movies} />
      <Footer />
    </div>
  );
}
