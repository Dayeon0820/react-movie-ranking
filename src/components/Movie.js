import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../css/Movie.module.css";
function Movie({ id, coverImg, title, summary, genres }) {
  return (
    <div className={styles.movieBox}>
      <div className={styles.movieBox_column}>
        <img src={coverImg} alt={title} />
      </div>
      <div className={styles.movieBox_column}>
        <h2>
          <Link className={styles.title} to={`/movie/${id}`}>
            {title}
          </Link>
        </h2>
        <ul>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        {summary.length < 600 ? (
          <p>{summary}</p>
        ) : (
          <p>{summary.split(" ").slice(0, 30).join(" ")}... </p>
        )}
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
