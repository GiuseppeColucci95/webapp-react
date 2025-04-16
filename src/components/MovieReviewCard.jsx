export default function MovieReviewCard({ review }) {

  function printRating(vote) {

    const stars = [];
    const empty = [];

    for (let i = 0; i < vote; i++) {
      stars.push(<i key={`full-star-${i}`} className="bi bi-star-fill"></i>);
    }

    for (let i = 0; i < 5 - vote; i++) {
      empty.push(<i key={`empty-star-${i}`} className="bi bi-star"></i>);
    }

    return [...stars, ...empty];
  }

  return (
    <div className="col">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>Name: {review.name}</div>
          <div>Vote: {printRating(review.vote)}</div>
        </div>
        <div className="card-body">
          {review.text}
        </div>
      </div>
    </div>
  );
}