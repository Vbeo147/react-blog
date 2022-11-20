import { isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import AppRouter from "./AppRouter";
import "../index.css";

function HomePage() {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <>
      {isLoaded(auth) ? (
        <div className="flex flex-row">
          <div className="scroll-container">
            <Menu />
          </div>
          <div className="pl-[320px]">
            <AppRouter />
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default HomePage;
