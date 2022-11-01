import { Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import "../css/reset.css";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
