import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import {
  AiFillHome,
  AiFillTag,
  BiLogOut,
  FaQuestionCircle,
  BsFillPencilFill,
  BiLogIn,
} from "react-icons/all";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OverView() {
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
    <div className="flex flex-col justify-center w-full">
      {isLoaded(auth) && !isEmpty(auth) ? (
        <>
          <div className="flex flex-row justify-start items-center px-5 pb-6 border border-b-gray-300 border-t-transparent border-x-transparent">
            <span className="flex justify-center items-center mb-[10px] text-2xl font-bold tracking-tighter select-none text-gray-300 mr-6">
              {auth.displayName}
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
          <span>글쓰기</span>
        </button>
      )}
    </div>
  );
}

export default OverView;
