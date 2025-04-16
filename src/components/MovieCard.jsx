export default function MovieCard({ movie }) {

  return (
    <div className="col">
      <div className="card h-100">
        <img src={`http://localhost:3000/images/${movie.image}`} alt={`${movie.title} image`} className="card-img-top h-100" />
        <div className="card-body">
          <h2>{movie.title}</h2>
          <p className="m-0">Directed by: <strong>{movie.director}</strong></p>
          <p className="m-0">Year: <strong>{movie.release_year}</strong></p>
        </div>
      </div>
    </div>
  );
}