import CurrentList from "./CurrentList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Pagination({ itemsPerPage, items, currentPage, BtnLimit }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(BtnLimit);
  const navigate = useNavigate();
  useEffect(() => {
    if (items) {
      setPageCount(Math.ceil(items.length / itemsPerPage));
      setStartIndex(Math.floor(currentPage / BtnLimit) * BtnLimit - 1);
      setLastIndex(startIndex + BtnLimit);
    }
  }, [items, itemsPerPage, currentPage, BtnLimit, startIndex]);
  const itemArr =
    items && new Array(items.length).fill().map((item, index) => index);
  const SaveStartIndex = items && itemArr[startIndex];
  const SaveLastIndex = items && itemArr[lastIndex];
  const onPageClick = (page) => {
    navigate(`/page/${page + 1}`);
  };
  return (
    <>
      {items && (
        <>
          <div></div>
          <ul>
            {itemArr.slice(startIndex, lastIndex).map((item, index) => {
              return (
                <li
                  onClick={() => onPageClick(item)}
                  style={{
                    display: "inline",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                  key={index}
                >
                  {item + 1}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

export default Pagination;
