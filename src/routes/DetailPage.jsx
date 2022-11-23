import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
  return (
    <div className="p-[50px] w-[1200px]">
      {writeSelector && (
        <>
          <div className="flex flex-col justify-start w-full">
            <div className="flex justify-center items-center mb-10 border border-2 border-b-gray-400 pb-5 w-full select-none">
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
            <div
              className="break-all leading-7"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(writeSelector[id]?.info.Quilltext),
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default DetailPage;
