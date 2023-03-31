import styles from "./QuestionPage.module.css";
import Question from "./Question";
import { useEffect, useState } from "react";
import { getQuestions } from "../../requests/requests";
import { inferenceMachince } from "../../inference/InferenceMachine";
import Button from "../../components/Button/Button";
import Movie from "./Movie";

function QuestionPage() {
  const [questions, setQuestions] = useState({});
  const [questionIndex, setQuestionIndex] = useState(2);
  const [responses, setResponses] = useState({ Q01: 1 });
  const [userPreferences, setUserPreferences] = useState({});

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
          setUserPreferences((prevState) => {
                return {...prevState, "genre": genre}
          })
      });
    }
  };

  useEffect(() => {
    getQuestions().then((data) => setQuestions(data));
  }, []);

  return (
    <div className={styles.background}>
      {/*{questionIndex < 10 && (*/}
      {/*  <Question*/}
      {/*    question={questions[`Q0${questionIndex}`]}*/}
      {/*    handleResponse={handleResponse}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{questionIndex === 10 && (*/}
      {/*  <Question*/}
      {/*    question={questions[`Q${questionIndex}`]}*/}
      {/*    handleResponse={handleResponse}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{questionIndex > 10 && <Button buttonName={movieGenre} onClick={()=>{co}}/>}*/}
        <Movie/>
    </div>
  );
}

export default QuestionPage;
