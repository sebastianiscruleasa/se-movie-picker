import styles from "./Button.module.css";

function Button ({buttonName, onClick}) {
    return (
        <div>
            <button className={styles.button} onClick={onClick}>{buttonName}</button>
        </div>
    );
}

export default Button;