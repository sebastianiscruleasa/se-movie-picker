import styles from "./QuestionPage.module.css";
import Question from "./Question";
import { useEffect, useState } from "react";
import { getQuestions } from "../../requests/requests";
import { inferenceMachince } from "../../inference/InferenceMachine";
import Button from "../../components/Button/Button";

function QuestionPage() {
  const [questions, setQuestions] = useState({});
  const [questionIndex, setQuestionIndex] = useState(2);
  const [responses, setResponses] = useState({ Q01: 1 });
  let movieGenre;

  const handleResponse = (response) => {
    if (questionIndex < 10) {
      setResponses((prevState) => {
        const questionId = `Q0${questionIndex}`;
        return { ...prevState, [questionId]: response };
      });
      setQuestionIndex((prevState) => prevState + 1);
    } else {
      setResponses((prevState) => {
        const questionId = `Q${questionIndex}`;
        return { ...prevState, [questionId]: response };
      });
      setQuestionIndex((prevState) => prevState + 1);
      inferenceMachince(responses).then((genre) => {
        movieGenre = genre;
        console.log(movieGenre);
      });
    }
  };

  useEffect(() => {
    getQuestions().then((data) => setQuestions(data));
  }, []);

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
      {questionIndex > 10 && <Button buttonName={movieGenre} />}
    </div>
  );
}

export default QuestionPage;
