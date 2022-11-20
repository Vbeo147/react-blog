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
    <div>
      {writeSelector && (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(writeSelector[id]?.info.text),
            }}
          />
        </>
      )}
      <div>
        <button onClick={() => navigate(-1)}>이전 페이지</button>
      </div>
    </div>
  );
}

export default DetailPage;
