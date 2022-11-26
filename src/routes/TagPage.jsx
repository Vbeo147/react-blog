import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

function TagPage() {
  useFirestoreConnect(["categorys", "write"]);
  const categorySelector = useSelector(
    (state) => state.firestore.data.categorys
  );
  const writeSelector = useSelector((state) => state.firestore.data.write);
  return (
    <div className="main-padding">
      {writeSelector && (
        <div className="flex flex-wrap w-[800px] 2xl:w-[1200px]">
          {Object.keys(categorySelector)
            .filter((categoryName) => {
              return (
                categorySelector[categoryName]?.CheckUndefined !==
                (null || undefined)
              );
            })
            .map((item, index) => (
              <span
                className="mr-5 cursor-pointer select-none border border-2 border-gray-300 px-1.5 py-1 rounded-[5px] hover:bg-gray-300"
                key={index}
              >
                {item}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}

export default TagPage;
