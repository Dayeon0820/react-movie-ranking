import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/";
import styles from "../css/Detail.module.css";
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setLoading(false);
    setMovie(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.main}>
      {loading ? <h1>Loading...</h1> : null}
      <h1>{movie.title}</h1>
      <img className={styles.coverImg} src={movie.large_cover_image} />
      <div>
        {/* 조건부 렌터링*/}
        {movie &&
          movie.genres &&
          movie.genres.map((g) => (
            <span className={styles.genre} key={g}>
              {g}
            </span>
          ))}
      </div>
      <span className={styles.rate}>rating: {movie.rating}</span>
      <span className={styles.year}>{movie.year}</span>
      <p>{movie.description_full}</p>
      <img className={styles.bgImg} src={movie.background_image_original} />
    </div>
  );
}
export default Detail;
