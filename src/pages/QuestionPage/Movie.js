import styles from './Movie.module.css';
import {AiFillStar} from 'react-icons/ai';
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

const dummyMovie = {
    "title": "The Shawshank Redemption",
    "year": 1994,
    "rated": "R",
    "released": 782085600000,
    "runtime": 142,
    "genre": "Drama",
    "director": "Frank Darabont",
    "writer": "Stephen King (short story \"Rita Hayworth and Shawshank Redemption\"), Frank Darabont (screenplay)",
    "actors": "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
    "plot": "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
    "language": "English",
    "country": "USA",
    "awards": "Nominated for 7 Oscars. Another 21 wins & 36 nominations.",
    "poster": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    "ratings": [
        {"source": "Internet Movie Database", "value": "9.3/10"},
        {"source": "Rotten Tomatoes", "value": "91%"},
        {"source": "Metacritic", "value": "80/100"}
    ],
    "metascore": 80,
    "imdbrating": 9.3,
    "imdbvotes": 2367380,
    "imdbid": "tt0111161",
    "type": "movie",
    "dvd": 1218747600000,
    "boxoffice": 28699976,
    "production": "Columbia Pictures, Castle Rock Entertainment",
    "website": null
}

function Movie() {
    const navigate = useNavigate();
    const calculatedRuntime = `${Math.floor(dummyMovie.runtime/60)}h ${dummyMovie.runtime%60}m`;
    const {title, year, rated, actors, plot, language, imdbrating, poster} = dummyMovie;
    return (
        <div className={styles.container}>
            <div className={styles.moviePosterContainer}>
                <img className={styles.moviePoster} src={poster} alt={title}/>
            </div>
            <div className={styles.movieDetailsContainer}>
                <div className={styles.movieTitle}>{title}</div>
                <div className={styles.movieDetails}>{year} · {rated} · {calculatedRuntime} · {language}</div>
                <div className={styles.movieImdbRating}>
                    <AiFillStar style={{color:"yellow"}}/>
                    {imdbrating}
                </div>
                <div className={styles.movieActors}>{actors}</div>
                <div className={styles.moviePlot}>{plot}</div>
                <Button buttonName="Start again" onClick={() => navigate('/')}/>
            </div>
        </div>

    )
}

export default Movie;