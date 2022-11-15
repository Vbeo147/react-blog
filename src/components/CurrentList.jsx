import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CurrentList({ currentItems }) {
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        {writeSelector &&
          currentItems
            .filter((id) => writeSelector[id]?.info !== (null || undefined))
            .map((currentID, index) => {
              const CurrentItem = writeSelector[currentID];
              return (
                <li key={index}>
                  <span onClick={() => navigate(`/detail/${currentID}`)}>
                    {`[ ${CurrentItem.categoryName} ] ${CurrentItem.info.title}`}
                  </span>
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default CurrentList;
