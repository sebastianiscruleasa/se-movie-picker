import styles from "./QuestionPage.module.css";
import Question from "./Question";
import {useEffect, useState} from "react";
import {getQuestions} from "../../requests/requests";
import {inferenceMachince} from "../../inference/InferenceMachine";
import Movie from "./Movie";

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

function QuestionPage() {
    const [questions, setQuestions] = useState({});
    const [questionIndex, setQuestionIndex] = useState(2);
    const [responses, setResponses] = useState({Q01: 1});
    // const [userPreferences, setUserPreferences] = useState({});
    const [pickedMovie, setPickedMovie] = useState(null);

    const handleResponse = (response) => {
        if (questionIndex < 10) {
            setResponses((prevState) => {
                const questionId = `Q0${questionIndex}`;
                return {...prevState, [questionId]: response};
            });
            setQuestionIndex((prevState) => prevState + 1);
        } else {
            setResponses((prevState) => {
                const questionId = `Q${questionIndex}`;
                return {...prevState, [questionId]: response};
            });
            setQuestionIndex((prevState) => prevState + 1);
            inferenceMachince(responses).then((genre) => {
                // setUserPreferences((prevState) => {
                //     return {...prevState, "genre": genre}
                // })
                setPickedMovie(dummyMovie);
            });
        }
    };

    useEffect(() => {
        getQuestions().then((data) => setQuestions(data));
    }, []);

    const startAgainHandler = () => {
        setPickedMovie(null);
        setQuestionIndex(2);
        setResponses({Q01: 1});
    }

    return (
        <div className={styles.background}>
            {questionIndex < 10 && (
                <Question
                    question={questions[`Q0${questionIndex}`]}
                    handleResponse={handleResponse}
                />
            )}
            {questionIndex === 10 && (
                <Question
                    question={questions[`Q${questionIndex}`]}
                    handleResponse={handleResponse}
                />
            )}
            {pickedMovie && <Movie movie={pickedMovie} onStartAgain={startAgainHandler}/>}
        </div>
    );
}

export default QuestionPage;
