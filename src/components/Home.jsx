import { isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import Category from "./Category";
import AppRouter from "./AppRouter";

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
