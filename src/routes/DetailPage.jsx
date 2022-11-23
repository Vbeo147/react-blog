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
          <div className="flex justify-center items-center mb-10 border border-2 border-b-gray-400 pb-5">
            <span className="text-3xl mr-10">{`[ ${writeSelector[id].categoryName} ]`}</span>
            <span className="text-3xl">{writeSelector[id].info.title}</span>
          </div>
          <div
            className="break-all leading-7"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(writeSelector[id]?.info.Quilltext),
            }}
          />
        </>
      )}
    </div>
  );
}

export default DetailPage;
