import ReactPaginate from "react-paginate";
import { useState, useEffect, useMemo } from "react";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

function Pagination() {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const items = useMemo(
    () => writeSelector && Object.keys(writeSelector),
    [writeSelector]
  );
  const itemsPerPage = 5;
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
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default Pagination;
