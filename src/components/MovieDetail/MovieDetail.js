function MovieDetail({ img, title, year, score, overview, genres }) {
  return (
    <section>
      <div>
        <img src={img} alt="desc" />
      </div>
      <div>
        <h2>
          {title} {year}
        </h2>
        <p>User Score: {score}</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h4>Genres</h4>
        <p>{genres}</p>
      </div>
    </section>
  );
}

export default MovieDetail;
