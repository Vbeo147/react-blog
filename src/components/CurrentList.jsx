import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CurrentList({ currentItems }) {
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const navigate = useNavigate();
  if (currentItems.length > 0) {
    return (
      <>
        <ul className="flex flex-col items-center justify-center">
          {writeSelector &&
            currentItems
              .filter((id) => writeSelector[id]?.info !== (null || undefined))
              .map((currentID, index) => {
                const CurrentItem = writeSelector[currentID];
                return (
                  <li
                    className="border border-4 border-gray-300 w-[560px] h-[160px] px-8 py-6 flex flex-col justify-start items-start mb-4 select-none hover:border-gray-400 cursor-pointer"
                    key={index}
                    onClick={() => navigate(`/detail/${currentID}`)}
                  >
                    <div className="flex flex-col justify-center items-start w-full">
                      <div className="flex flex-row justify-between items-center h-[25px] w-full mb-4 border border-b-gray-400 pb-4 border-x-transparent border-t-transparent">
                        <div className="flex flex-row justify-start items-center">
                          <span className="text-lg font-bold opacity-60 leading-[25px] mr-4">{`[ ${CurrentItem.categoryName} ]`}</span>
                          <span
                            title={writeSelector[currentID].info.title}
                            className="overflow-hidden w-[220px]"
                          >
                            {writeSelector[currentID].info.title}
                          </span>
                        </div>
                        <div className="flex flex-row justify-end items-center">
                          날짜
                        </div>
                      </div>
                      <div className="tracking-tight">
                        {writeSelector[currentID].info.text.slice(0, 80)}
                      </div>
                    </div>
                  </li>
                );
              })}
        </ul>
      </>
    );
  } else {
    return <div>검색결과를 찾을 수 없습니다</div>;
  }
}

export default CurrentList;
