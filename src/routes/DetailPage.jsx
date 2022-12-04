import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

function DetailPage() {
  const { id } = useParams();
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const auth = useSelector((state) => state.firebase.auth);
  const firestore = useFirestore();
  const navigate = useNavigate();
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
              <div className="flex justify-center items-center mb-10 border border-2 border-b-gray-400 pb-3 w-full select-none">
                <div id="test" className="flex flex-col justify-center w-full">
                  <div className="flex flex-row justify-center items-center mb-2.5">
                    <span className="text-3xl mr-10 overflow-hidden">{`[ ${writeSelector[
                      id
                    ].categoryName.slice(0, 15)} ]`}</span>
                    <span
                      title={writeSelector[id].info.title}
                      className="text-3xl overflow-hidden"
                    >
                      {writeSelector[id].info.title.slice(0, 20)}
                    </span>
                  </div>
                  <div className="flex flex-row justify-end items-center text-sm">
                    <span className="opacity-60 mr-4">{`게시일 : ${timestamp.format(
                      writeSelector[id].time.createdAt
                    )}`}</span>
                    {auth.uid === import.meta.env.VITE_ADMIN_UID && (
                      <>
                        <button
                          onClick={() => navigate(`/modify/${id}`)}
                          className="border border-2 border-gray-300 px-1 py-0.5 mr-2 rounded-[5px]"
                        >
                          Modify
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
                          className="border border-2 border-gray-300 px-1 py-0.5 rounded-[5px]"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* second div */}
              <div
                className="break-all leading-7 font-mono"
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
