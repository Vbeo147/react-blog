import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination";

function CurrentPagination() {
  const [sort, setSort] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const { page } = useParams();
  const BtnLimit = 5;
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const items = useMemo(
    () =>
      writeSelector &&
      Object.keys(writeSelector)
        .filter((id) => writeSelector[id]?.info !== (null || undefined))
        .sort(function (a, b) {
          return sort
            ? writeSelector[a].createdAt - writeSelector[b].createdAt
            : writeSelector[b].createdAt - writeSelector[a].createdAt;
        })
        .filter((currentID) => {
          return writeSelector[currentID].categoryName
            .toLowerCase()
            .includes(tagSearch.toLowerCase());
        }),
    [writeSelector, sort, tagSearch]
  );
  const onChange = (e) => {
    setTagSearch(e.target.value);
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={tagSearch || ""}
          onChange={onChange}
          placeholder="검색할 태그를 입력해주세요"
          id="search_input"
        />
        <label htmlFor="search_input" onClick={() => setTagSearch("")}>
          X
        </label>
        <button onClick={() => setSort(!sort)}>
          {sort ? "오래된순" : "최신순"}
        </button>
      </div>
      <div>
        <Pagination
          itemsPerPage={10}
          items={items}
          currentPage={page ? parseInt(page) : 1}
          BtnLimit={BtnLimit}
        />
      </div>
    </>
  );
}

export default CurrentPagination;
