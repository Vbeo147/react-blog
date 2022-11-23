import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Auth() {
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
    <div className="flex flex-col justify-center w-[260px]">
      {isLoaded(auth) && !isEmpty(auth) ? (
        <>
          <h1 className="flex justify-center items-center mb-[10px] text-2xl font-bold opacity-80 tracking-tighter select-none">
            {auth.displayName}
          </h1>
          <button
            className="text-xl text-white border hover:border-purple-600 rounded-full bg-purple-400 px-2 py-1.5 font-bold"
            onClick={onLogOut}
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <button
            className="text-xl text-white border hover:border-purple-600 rounded-full bg-purple-400 px-2 py-1.5 font-bold"
            onClick={onLogIn}
          >
            Continue with Github
          </button>
        </>
      )}
      <button
        className="mt-7 text-lg border border-y-gray-400 border-x-transparent py-[10px] font-bold"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <button
        className="mt-7 text-lg border border-y-gray-400 border-x-transparent py-[10px] font-bold"
        onClick={() => navigate("/about")}
      >
        About
      </button>
      {auth.uid === import.meta.env.VITE_ADMIN_UID && (
        <button
          className="mt-7 text-lg border border-y-gray-400 border-x-transparent py-[10px] font-bold"
          onClick={() => navigate("/write")}
        >
          글쓰기
        </button>
      )}
    </div>
  );
}

export default Auth;
