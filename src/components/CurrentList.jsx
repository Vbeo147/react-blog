import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

function CurrentList({ currentItems }) {
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
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
                  <span>{CurrentItem.info.title}</span>
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default CurrentList;
