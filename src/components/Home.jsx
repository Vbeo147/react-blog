import { isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import AppRouter from "./AppRouter";

function HomePage() {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <>
      {isLoaded(auth) ? (
        <div>
          <div>
            <Menu />
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
