import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieReviewCard from "../components/MovieReviewCard";

export default function MovieDetails() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    vote: "",
    review: ""
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/movies/' + id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.title) setMovie(data);
      })
      .catch(err => { console.log(err) });
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(formData);
  }

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
      <div className="container mt-5">
        <div className="card p-5">
          <h3 className="text-center pb-3">INSERT YOUR REVIEW HERE</h3>

          <form onSubmit={handleSubmit}>
            <div className="d-flex align-items-center justify-content-between gap-3">
              <div className="mb-3 w-50">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Insert your name here..."
                  aria-describedby="helpId"
                />
              </div>

              <div className="mb-3 w-50">
                <label htmlFor="vote" className="form-label">Vote</label>
                <input
                  value={formData.vote}
                  onChange={handleChange}
                  type="text"
                  min='1'
                  max='5'
                  name="vote"
                  id="vote"
                  className="form-control"
                  placeholder="Insert your vote from 1 to 5"
                  aria-describedby="helpId"
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="review" className="form-label">Review</label>
              <textarea
                value={formData.review}
                onChange={handleChange}
                className="form-control"
                name="review"
                id="review"
                rows="3"
                placeholder="Insert your review here...">
              </textarea>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>




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