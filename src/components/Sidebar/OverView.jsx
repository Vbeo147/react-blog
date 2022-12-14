import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import {
  AiFillHome,
  AiFillTag,
  BiLogOut,
  BsFillPencilFill,
  BiLogIn,
} from "react-icons/all";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

function OverView() {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const navigate = useNavigate();
  const onLogIn = () => {
    firebase.login({
      provider: "github",
      type: "popup",
    });
  };
  const onLogOut = useCallback(() => {
    firebase.logout();
    navigate("/");
  }, []);
  return (
    <div className="flex flex-col justify-center w-full">
      {isLoaded(auth) && !isEmpty(auth) ? (
        <>
          <div className="flex flex-row justify-start items-center px-5 pb-6 border border-b-gray-300 border-t-transparent border-x-transparent">
            <span className="flex justify-center items-center mb-[10px] text-2xl font-bold tracking-tighter select-none text-gray-300 mr-6">
              <img
                className="w-[50px] h-[50px] rounded-[8px]"
                src={auth.photoURL}
                alt=""
              />
            </span>
            <button className="text-white text-3xl" onClick={onLogOut}>
              <BiLogOut />
            </button>
          </div>
        </>
      ) : (
        <>
          <button className="components-overview-btn" onClick={onLogIn}>
            <i>
              <BiLogIn />
            </i>
            <span>Log In</span>
          </button>
        </>
      )}
      <button className="components-overview-btn" onClick={() => navigate("/")}>
        <i>
          <AiFillHome />
        </i>
        <span>Home</span>
      </button>
      <button
        onClick={() => navigate("/tags")}
        className="components-overview-btn"
      >
        <i>
          <AiFillTag />
        </i>
        <span>Tags</span>
      </button>
      {auth.uid === import.meta.env.VITE_ADMIN_UID && (
        <button
          className="components-overview-btn"
          onClick={() => navigate("/write")}
        >
          <i>
            <BsFillPencilFill />
          </i>
          <span>?????????</span>
        </button>
      )}
    </div>
  );
}

export default OverView;
