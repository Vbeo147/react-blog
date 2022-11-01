import { isLoaded } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Menu from "../components/Menu";
import TagMenu from "../components/TagMenu";

function Home() {
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
              <TagMenu />
            </div>
            <div>Hello</div>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default Home;
