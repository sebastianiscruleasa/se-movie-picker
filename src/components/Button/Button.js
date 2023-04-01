import styles from "./Button.module.css";

function Button ({buttonName, onClick, homepageButton=false }) {
    return (
        <div className={styles.buttonContainer}>
            <button className={homepageButton ? `${styles.button} ${styles.homepageButton}` : styles.button} onClick={onClick}>{buttonName}</button>
        </div>
    );
}

export default Button;