import styles from './Movie.module.css';
import {AiFillStar} from 'react-icons/ai';
import Button from "../../components/Button/Button";

function Movie({movie, onStartAgain}) {
    const calculatedRuntime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
    const {title, year, rated, actors, plot, language, imdbrating, poster} = movie;
    return (
        <div className={styles.container}>
            <img className={styles.moviePoster} src={poster} alt={title}/>
            <div className={styles.movieDetailsContainer}>
                <div className={styles.movieTitle}>{title}</div>
                {imdbrating !== 0 && <>
                    <div className={styles.movieDetails}>{year} · {rated} · {calculatedRuntime} · {language}</div>
                    <div className={styles.movieImdbRating}>
                        <AiFillStar style={{color: "yellow"}}/>
                        {imdbrating}
                    </div>
                </>}
                <div className={styles.movieActors}>{actors}</div>
                <div className={styles.moviePlot}>{plot}</div>
                <Button buttonName="Start again" onClick={onStartAgain}/>
            </div>
        </div>

    )
}

export default Movie;