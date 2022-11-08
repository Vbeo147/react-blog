import { Routes, Route } from "react-router-dom";
import AboutPage from "../routes/AboutPage";
import WritePage from "../routes/WritePage";
import "../css/reset.css";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<AboutPage />} />
        <Route path="/write" element={<WritePage />} />
      </Routes>
    </>
  );
}

export default AppRouter;
