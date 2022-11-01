import { Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import WritePage from "../routes/WritePage";
import "../css/reset.css";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/write" element={<WritePage />} />
      </Routes>
    </>
  );
}

export default App;
