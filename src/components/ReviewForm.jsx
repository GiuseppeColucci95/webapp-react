import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewForm({ movieId }) {

  const navigate = useNavigate(0);
  const api_url = `http://localhost:3000/api/v1/movies/${movieId}/reviews`;
  const [formData, setFormData] = useState({
    name: "",
    vote: 1,
    review: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);

  function isFormValid(formData) {

    const errors = {};

    if (formData.name.length < 2) errors.name = "Name must be at least 2 characters long!";
    if (formData.name.length > 255) errors.name = "Name must be max 255 characters long!";

    if (formData.review.length < 20) errors.review = "Your review must be at least 20 characters long!";
    if (formData.review.length > 500) errors.review = "Your review must be max 500 characters long!";

    if (formData.vote < 1 || formData.vote > 5) errors.vote = "Your vote must be a value from 1 to 5!";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid(formData)) {
      return;
    }

    fetch(api_url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data?.message) {
          setFormSuccess(data.message);

          setTimeout(() => {
            navigate(0);
          }, 1000);
        }
      })
      .catch(err => {
        console.log("Error submitting form: ", err);
      })
  }

  return (

    <div className="container mt-5">
      <div className="card p-5">
        <h3 className="text-center pb-3">INSERT YOUR REVIEW HERE</h3>

        {
          Object.keys(formErrors).length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {
                  Object.keys(formErrors).map(key => (
                    <li key={key}>{formErrors[key]}</li>
                  ))
                }
              </ul>
            </div>
          )
        }

        {
          formSuccess && (
            <div className="alert alert-success">
              <ul className="mb-0">
                <li>{formSuccess}</li>
              </ul>
            </div>
          )
        }

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
                type="number"
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

          <button type="submit" className="btn btn-warning d-block mx-auto">Submit</button>
        </form>
      </div>
    </div>
  );
}