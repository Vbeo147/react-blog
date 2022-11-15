import ReactPaginate from "react-paginate";
import { useState, useEffect, useMemo } from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import CurrentList from "../components/CurrentList";

function Pagination() {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [sort, setSort] = useState(false);
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
        }),
    [writeSelector, sort]
  );
  const itemsPerPage = 10;
  useEffect(() => {
    if (items) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, items]);
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <div>
        <button onClick={() => setSort(!sort)}>
          {sort ? "오래된순" : "최신순"}
        </button>
      </div>
      <CurrentList currentItems={currentItems} />
      <div>
        {writeSelector ? (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        ) : (
          "게시글이 없습니다"
        )}
      </div>
    </>
  );
}

export default Pagination;
