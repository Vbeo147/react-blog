import { isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import SideBar from "./SideBar";
import AppRouter from "./AppRouter";
import "../index.css";

function Home() {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <>
      {isLoaded(auth) ? (
        <div className="flex flex-row">
          <div>
            <SideBar />
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

export default Home;
