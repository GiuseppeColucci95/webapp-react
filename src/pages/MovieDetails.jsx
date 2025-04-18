import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieReviewCard from "../components/MovieReviewCard";
import ReviewForm from "../components/ReviewForm";

export default function MovieDetails() {

  //variables
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  //useEffect at start of the component
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/movies/' + id)
      .then(res => res.json())
      .then(data => {
        if (data.title) setMovie(data);
      })
      .catch(err => console.log(err));
  }, [id]);

  //template
  return (
    <>
      {/* JUMBOTRON */}
      {
        movie ? (
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8 mb-5 d-flex flex-column justify-content-between">
                  <div>
                    <button onClick={() => navigate(-1)} name="back" id="back" className="btn btn-warning mb-5 mt-3" role="button">Go Back</button>
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
        ) : (
          <div className="container my-5">
            <h1>No Movies Founded!</h1>
          </div>
        )
      }

      {/* FORM */}
      <ReviewForm movieId={id}></ReviewForm>

      {/* REVIEWS LIST */}
      {
        movie && (
          <div className="container my-5">
            <h1 className="my-3">Reviews List</h1>

            <div className="row row-cols-1 g-3">

              {
                movie.reviews ? (
                  movie.reviews.map(review => (
                    <MovieReviewCard key={review.id} review={review}></MovieReviewCard>
                  ))
                ) : (<p>No Movies Found!</p>)
              }

            </div>
          </div>
        )
      }
    </>
  );
}