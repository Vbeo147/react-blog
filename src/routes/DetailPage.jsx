import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

function DetailPage() {
  const { id } = useParams();
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
  return (
    <div>
      {writeSelector && (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(writeSelector[id]?.info.text),
          }}
        />
      )}
    </div>
  );
}

export default DetailPage;
