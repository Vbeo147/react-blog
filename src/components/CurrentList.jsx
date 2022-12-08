import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CurrentList({ currentItems }) {
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const navigate = useNavigate();
  const isLoading = currentItems[0] === "";
  if (currentItems.length > 0 && !isLoading) {
    return (
      <>
        <ul className="flex flex-col items-center justify-center">
          {currentItems
            .filter((id) => writeSelector[id]?.info !== (null || undefined))
            .map((currentID, index) => {
              const CurrentItem = writeSelector[currentID];
              const timestamp = new Intl.DateTimeFormat("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <li
                  className="border border-4 border-gray-300 w-[640px] h-[160px] px-8 py-6 flex flex-col justify-start items-start mb-4 select-none hover:border-gray-400 cursor-pointer"
                  key={index}
                  onClick={() => navigate(`/detail/${currentID}`)}
                >
                  <div className="flex flex-col justify-center items-start w-full">
                    <div className="flex flex-row justify-between items-center h-[25px] w-full mb-2 border border-b-gray-400 pb-4 border-x-transparent border-t-transparent">
                      <div className="flex flex-row justify-start items-center">
                        <div className="font-bold opacity-60 leading-[25px] mr-4 overflow-hidden">{`[ ${CurrentItem.categoryName.slice(
                          0,
                          14
                        )} ]`}</div>
                        <div
                          title={CurrentItem.info.title}
                          className="overflow-hidden w-[200px] mr-2"
                        >
                          {CurrentItem.info.title}
                        </div>
                      </div>
                      <div className="flex flex-row justify-end items-center text-[12px] font-bold opacity-60">
                        {CurrentItem.time.isUpdate
                          ? `${timestamp.format(
                              CurrentItem.time.updatedAt
                            )} (수정됨)`
                          : timestamp.format(CurrentItem.time.createdAt)}
                      </div>
                    </div>
                    <div className="tracking-tight text-sm w-[560px] h-[80px] overflow">
                      {CurrentItem.info.text}
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </>
    );
  } else if (isLoading) {
    return <div>게시글 정보를 받아오는 중...</div>;
  } else {
    return <div>검색결과를 찾을 수 없습니다</div>;
  }
}

export default CurrentList;
