import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {

  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/movies/' + id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMovie(data);
      })
  }, []);

  return (
    <>
      {/* JUMBOTRON */}
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-8 my-5 d-flex flex-column justify-content-between">
              <div>
                <h1 className="display-5 fw-bold">{movie.title}</h1>
                <p className="col-md-10 fs-4">{movie.abstract}</p>
              </div>

              <div>
                <p className="col-md-10 fs-6 m-0">Directed by: <strong>{movie.director}</strong></p>
                <p className="col-md-10 fs-6 m-0">Release date: <strong>{movie.release_year}</strong></p>
              </div>

            </div>
            <div className="col-4">
              <img className="w-100" src={`http://localhost:3000/images/${movie.image}`} alt={`${movie.title} image`} />
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS LIST */}
      <div className="container">
        <h1>Reviews List</h1>
      </div>
    </>
  );
}