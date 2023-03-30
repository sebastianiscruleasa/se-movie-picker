import './App.css';
import HomePage from "./pages/HomePage";
import QuestionPage from "./pages/QuestionPage";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/question" element={<QuestionPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
