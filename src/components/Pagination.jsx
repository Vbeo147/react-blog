import CurrentList from "./CurrentList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Pagination({ itemsPerPage, items, currentPage, BtnLimit }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (items) {
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }
  }, [items, itemsPerPage]);
  console.log(
    `start : ${startIndex}\n last : ${lastIndex}\n page: ${pageCount}`
  );
  const test = new Array(30).fill().map((item, index) => index);
  return (
    <>
      <div>{}</div>
      <ul>
        {test.slice(startIndex, lastIndex).map((item, index) => {
          return (
            <li
              onClick={() => navigate(`/page/${item}`)}
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
  );
}

export default Pagination;
