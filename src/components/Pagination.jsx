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
      setStartIndex(
        currentPage < BtnLimit
          ? 0
          : Math.floor(currentPage / BtnLimit) * BtnLimit -
              (Math.floor(currentPage / pageCount) +
                Math.ceil(pageCount / currentPage))
      );
      setLastIndex(
        startIndex + BtnLimit > pageCount ? pageCount : startIndex + BtnLimit
      );
    }
  }, [items, itemsPerPage, currentPage, startIndex, pageCount]);
  console.log(
    `start : ${startIndex}\n last : ${lastIndex}\n page: ${pageCount}`
  );
  const itemArr =
    items && new Array(items.length).fill().map((item, index) => index);
  return (
    <>
      {items && (
        <>
          <div></div>
          <ul>
            {itemArr.slice(startIndex, lastIndex).map((item, index) => {
              return (
                <li
                  onClick={() => navigate(`/page/${item + 1}`)}
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
