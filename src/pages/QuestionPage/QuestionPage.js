import styles from "./QuestionPage.module.css";
import Question from "./Question";
import {useEffect, useState} from "react";
import {getFilteredQuestions, getInferenceQuestions} from "../../requests/requests";
import {getMovieFromQuestions} from "../../inference/InferenceMachine";
import Movie from "./Movie";
import {MagnifyingGlass} from "react-loader-spinner";

function QuestionPage() {
    const [inferenceQuestions, setInferenceQuestions] = useState({});
    const [filteredQuestions, setFilteredQuestions] = useState({});
    const [questionIndex, setQuestionIndex] = useState(1);
    const [inferenceResponses, setInferenceResponses] = useState({});
    const [userPreferences, setUserPreferences] = useState([]);
    const [pickedMovie, setPickedMovie] = useState(null);

    const handleResponse = (response) => {
        if (questionIndex <= 10) {
            setInferenceResponses((prevState) => {
                const questionId = `Q${questionIndex}`;
                return {...prevState, [questionId]: response};
            });
            setQuestionIndex((prevState) => prevState + 1);
        } else if (questionIndex < 15) {
            setQuestionIndex((prevState) => prevState + 1);
            setUserPreferences((prevState) => {
                return [...prevState, response];
            });
        } else {
            setQuestionIndex((prevState) => prevState + 1);
            getMovieFromQuestions([inferenceResponses, ...userPreferences, response]).then((movie) => {
                setPickedMovie(movie);
            });
        }
    };

    useEffect(() => {
        getInferenceQuestions().then((data) => setInferenceQuestions(data));
        getFilteredQuestions().then((data) => setFilteredQuestions(data));
    }, []);

    const startAgainHandler = () => {
        setPickedMovie(null);
        setQuestionIndex(1);
        setInferenceResponses({});
        setUserPreferences([]);
    }

    return (
        <div className={styles.background}>
            {questionIndex <= 10 && (<Question
                question={inferenceQuestions[`Q${questionIndex}`]}
                handleResponse={handleResponse}
            />)}
            {questionIndex > 10 && (<Question
                question={filteredQuestions[`FQ${questionIndex - 10}`]}
                handleResponse={handleResponse}
            />)}
            <MagnifyingGlass
                visible={pickedMovie === null && questionIndex === 16}
                height="150"
                width="150"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)"}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor='#c0efff'
                color='#b71d22'
            />
            {pickedMovie && <Movie movie={pickedMovie} onStartAgain={startAgainHandler}/>}
        </div>
    );
}

export default QuestionPage;
