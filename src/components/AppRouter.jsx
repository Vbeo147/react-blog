import { Routes, Route } from "react-router-dom";
import AboutPage from "../routes/AboutPage";
import WritePage from "../routes/WritePage";
import Pagination from "../routes/Pagination";
import DetailPage from "../routes/DetailPage";
import ModifyPage from "../routes/ModifyPage";
import "../css/reset.css";

function AppRouter() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Pagination />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/modify/:id" element={<ModifyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default AppRouter;
