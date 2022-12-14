import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import WritePage from "../routes/WritePage";
import MainPage from "../routes/MainPage";
import DetailPage from "../routes/DetailPage";
import TagPage from "../routes/TagPage";

function AppRouter() {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/page/:page" element={<MainPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/tags" element={<TagPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        {auth.uid === import.meta.env.VITE_ADMIN_UID && (
          <>
            <Route path="/write" element={<WritePage />} />
            <Route path="/write/:id" element={<WritePage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default AppRouter;
