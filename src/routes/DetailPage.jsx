import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

function DetailPage() {
  const { id } = useParams();
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
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
                <div className="flex flex-col justify-center w-full">
                  <div className="flex flex-row justify-center items-center">
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
                  <div className="flex flex-row justify-end items-center opacity-60">
                    <span>{timestamp.format(writeSelector[id].createdAt)}</span>
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
