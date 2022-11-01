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
    <>
      <div
        style={{
          width: "100%",
          height: "80px",
          border: "1px solid black",
        }}
      >
        <div>
          {isLoaded(auth) && !isEmpty(auth) ? (
            <>
              <div>
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                  src={auth.photoURL}
                  alt=""
                />
                <span>{auth.displayName}</span>
                <div>
                  <button onClick={onLogOut}>Log Out</button>
                </div>
              </div>
            </>
          ) : (
            <button onClick={onLogIn}>Log In</button>
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
