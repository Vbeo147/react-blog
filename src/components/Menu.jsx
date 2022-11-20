import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div>
          {isLoaded(auth) && !isEmpty(auth) ? (
            <>
              <div>
                <div>
                  <div>{auth.displayName}</div>
                  <div onClick={onLogOut}>Log Out</div>
                </div>
                <div onClick={() => navigate("/")}>Home</div>
                <div onClick={() => navigate("/about")}>About</div>
                {auth.uid == import.meta.env.VITE_ADMIN_UID && (
                  <div onClick={() => navigate("/write")}>글쓰기</div>
                )}
              </div>
            </>
          ) : (
            <div onClick={onLogIn}>Log In</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
