import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useEffect, useRef } from "react";

function DetailPage() {
  const { id } = useParams();
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const auth = useSelector((state) => state.firebase.auth);
  const firestore = useFirestore();
  const navigate = useNavigate();
  const htmlRef = useRef();
  useEffect(() => {
    if (writeSelector) {
      const el = document.getElementById("title");
      const currentRef = htmlRef.current;
      const onWheel = (e) => {
        const { deltaY } = e;
        if (window.innerHeight < document.body.offsetHeight) {
          if (deltaY < 0) {
            el.classList.remove("hidden-element");
          }
          if (deltaY > 0) {
            el.classList.add("hidden-element");
          }
        }
      };
      currentRef.addEventListener("wheel", onWheel);
      return () => {
        currentRef.removeEventListener("wheel", onWheel);
      };
    }
  }, [writeSelector]);
  if (writeSelector) {
    const timestamp = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    return (
      <div className="main-padding md:w-[800px] 2xl:w-[1200px]">
        {writeSelector[id] ? (
          <>
            <div className="flex flex-col justify-start w-full">
              {/* first div */}
              <div
                id="title"
                className="flex justify-center items-center mb-10 border border-2 border-b-gray-400 border-x-transparent border-t-transparent pb-3 pt-6 select-none md:w-[800px] 2xl:w-[1200px] bg-white fixed top-0"
              >
                <div className="flex flex-col justify-center w-full">
                  <div className="flex flex-row justify-center items-center">
                    <span className="text-3xl mr-10">{`[ ${writeSelector[
                      id
                    ].categoryName.slice(0, 15)} ]`}</span>
                    <span
                      title={writeSelector[id].info.title}
                      className="text-3xl"
                    >
                      {writeSelector[id].info.title.slice(0, 20)}
                    </span>
                  </div>
                  <div className="flex flex-row justify-end items-center text-sm">
                    <span className="opacity-60 mr-4">{`게시일 : ${timestamp.format(
                      writeSelector[id].time.createdAt
                    )}`}</span>
                    <button
                      onClick={() => {
                        const beforepage = localStorage.getItem("page");
                        navigate(`/page/${beforepage}`);
                      }}
                      className="components-fixed-btn mr-2"
                    >
                      이전 페이지
                    </button>
                    {auth.uid === import.meta.env.VITE_ADMIN_UID && (
                      <>
                        <button
                          onClick={() => navigate(`/write/${id}`)}
                          className="components-fixed-btn mr-2"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => {
                            const ok =
                              window.confirm("해당 게시글을 삭제합니다");
                            if (ok) {
                              navigate("/");
                              firestore.doc(`write/${id}`).delete();
                            }
                          }}
                          className="components-fixed-btn"
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* second div */}
              <div
                ref={htmlRef}
                className="break-all leading-7 font-mono mt-[8rem]"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(writeSelector[id]?.info.Quilltext),
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div>현재 페이지에 대한 정보를 찾을 수 없습니다</div>
          </>
        )}
      </div>
    );
  }
}

export default DetailPage;
