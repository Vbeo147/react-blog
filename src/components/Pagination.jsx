import CurrentList from "./CurrentList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Pagination({ itemsPerPage, items, paramPage }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [PageCount, setPageCount] = useState(0);
  const [startIndex, setStartIndex] = useState(paramPage);
  const [lastIndex, setLastIndex] = useState(3);
  const navigate = useNavigate();
  const BtnLimit = 5;
  useEffect(() => {
    if (items) {
      setPageCount(Math.ceil(items.length / itemsPerPage));
      console.log(paramPage);
    }
  }, [itemsPerPage, items, paramPage]);
  return (
    <>
      <div>{/* Components CurrentList */}</div>
      <ul>
        {new Array(BtnLimit).fill().map((item, index) => {
          const CurrentBtnNumber = index + 1;
          return (
            <li
              onClick={() => navigate(`/page/${CurrentBtnNumber}`)}
              style={{ display: "inline", marginRight: "5px" }}
              key={index}
            >
              {CurrentBtnNumber}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Pagination;
