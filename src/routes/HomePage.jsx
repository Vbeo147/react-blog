import { isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Menu from "../components/Menu";
import Category from "../components/Category";
import AppRouter from "../components/AppRouter";

function HomePage() {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <>
      {isLoaded(auth) ? (
        <div>
          <div>
            <Menu />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div>
              <Category />
            </div>
            <div>
              <AppRouter />
            </div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default HomePage;
