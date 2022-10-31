import { useFirebase, isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Menu from "../components/Menu";

function Home() {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <>
      {isLoaded(auth) ? (
        <div>
          <Menu />
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default Home;
