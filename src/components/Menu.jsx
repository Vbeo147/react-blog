import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";

function Menu() {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const onLogIn = () => {
    firebase.login({
      provider: "google",
      type: "popup",
    });
  };
  const onLogOut = () => {
    firebase.logout();
  };
  return (
    <div>
      <div>
        {isLoaded(auth) && !isEmpty(auth) ? (
          <>
            <div>
              {auth.displayName}
              <br />
              <button onClick={onLogOut}>Log Out</button>
            </div>
          </>
        ) : (
          <button onClick={onLogIn}>Log In</button>
        )}
      </div>
    </div>
  );
}

export default Menu;
