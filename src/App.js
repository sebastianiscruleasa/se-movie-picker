import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/question" element={<QuestionPage />} />
      </Routes>
    </div>
  );
}

export default App;
