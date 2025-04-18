import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import LoaderContext from "../contexts/loaderContext";

export default function HomePage() {

  const [movies, setMovies] = useState([]);
  const api_url = 'http://localhost:3000/api/v1/movies';

  const { setIsLoading } = useContext(LoaderContext);

  useEffect(() => {

    fetch(api_url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMovies(data);

      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <>
      <div className="container my-5">

        <h1 className="mb-3">MOVIES LIST</h1>

        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">

          {
            movies.length > 0 ? (
              movies.map(movie => (
                <MovieCard key={movie.id} movie={movie}></MovieCard>
              ))
            ) : ('')
          }

        </div>

      </div>
    </>
  );
}