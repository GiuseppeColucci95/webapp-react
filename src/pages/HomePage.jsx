import { useEffect, useState } from "react";

export default function HomePage() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/movies')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMovies(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="container">

        <h1>MOVIES LIST</h1>

        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">

          {
            movies.length > 0 ? (
              movies.map(movie => (
                <div key={movie.id} className="col">
                  <div className="card h-100">
                    <img src={`http://localhost:3000/images/${movie.image}`} alt={`${movie.title} image`} className="card-img-top h-100" />
                    <div className="card-body">
                      <h2>{movie.title}</h2>
                      <p className="m-0">Directed by: <strong>{movie.director}</strong></p>
                      <p className="m-0">Year: <strong>{movie.release_year}</strong></p>
                    </div>
                  </div>
                </div>
              ))
            ) : ('')
          }

        </div>

      </div>
    </>
  );
}