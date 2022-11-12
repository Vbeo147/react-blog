import ReactPaginate from "react-paginate";
import { useState, useEffect, useMemo } from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CurrentList from "../components/CurrentList";

function Pagination() {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const { page } = useParams();
  const navigate = useNavigate();
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const items = useMemo(
    () => writeSelector && Object.keys(writeSelector),
    [writeSelector]
  );
  const itemsPerPage = 1;
  useEffect(() => {
    if (items) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, items]);
  const handlePageClick = (e) => {
    navigate(`/page/${parseInt(e.selected) + 1}`);
    const newOffset =
      // page의 값이 이전값으로 반환이 되서 1을 뺴주지 않아도됨 ( 원인은 나중에 파악 )
      ((page ? page : e.selected) * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };
  return (
    <>
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
