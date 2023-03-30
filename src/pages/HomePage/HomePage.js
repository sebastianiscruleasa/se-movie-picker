import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    return (
        <div className={styles.background}>
            <Button buttonName="Start" onClick={() => navigate('/question')}/>
        </div>
    );
}

export default HomePage;