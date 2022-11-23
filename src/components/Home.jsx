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
          <div>
            <Menu />
          </div>
          <div className="pl-[400px]">
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
