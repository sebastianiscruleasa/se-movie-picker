import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    return (
        <div className={styles.background}>
            <div className={styles.startContainer}>
                <Button buttonName="Start" homepageButton={true} onClick={() => navigate('/question')}/>
            </div>
        </div>
    );
}

export default HomePage;