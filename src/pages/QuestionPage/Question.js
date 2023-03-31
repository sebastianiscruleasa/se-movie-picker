import styles from "./Question.module.css";
import Button from "../../components/Button/Button";

function Question({ question, handleResponse }) {
  return (
    question && (
      <div className={styles.questionContainer}>
        <div className={styles.questionText}>{question.question}</div>
        <div className={styles.optionsContainer}>
          <Button
            buttonName={question.option1}
            onClick={() => handleResponse(0)}
          />
          <Button
            buttonName={question.option2}
            onClick={() => handleResponse(1)}
          />
        </div>
      </div>
    )
  );
}

export default Question;
