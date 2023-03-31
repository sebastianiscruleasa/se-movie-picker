import styles from './QuestionPage.module.css';
import Question from "./Question";
import {useState} from "react";

const questions = {
    "Q01":
        {
            question: "What is the capital of France?",
            option1: "Paris1",
            option2: "London1"
        },
    "Q02":
        {
            question: "What is the capital of England?",
            option1: "Paris2",
            option2: "London2"
        },
    "Q03":
        {
            question: "What is the capital of Germany?",
            option1: "Paris3",
            option2: "London3"
        }
}

function QuestionPage() {
    const [questionIndex, setQuestionIndex] = useState(1);
    const [responses, setResponses] = useState({});

    const handleResponse = (response) => {
        if (questionIndex < 3) {
            setResponses((prevState) => {
                    const questionId = `Q0${questionIndex}`;
                    return {...prevState, [questionId]: response}
                }
            );
            setQuestionIndex((prevState) => prevState + 1);
        } else {
            setResponses((prevState) => {
                    const questionId = `Q0${questionIndex}`;
                    return {...prevState, [questionId]: response}
                }
            );
            setQuestionIndex((prevState) => prevState + 1);
            //call inference machine
        }
    }

    return (
        <div className={styles.background}>
            {questionIndex <=3 &&<Question question={questions[`Q0${questionIndex}`]} handleResponse={handleResponse}/>}
            {questionIndex > 3 && <div>Thank you for your responses</div>}
        </div>
    );
}

export default QuestionPage;