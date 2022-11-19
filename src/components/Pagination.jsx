import CurrentList from "./CurrentList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Pagination({ itemsPerPage, items, currentPage, BtnLimit }) {
  const [currentItems, setCurrentItems] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [startBtnIndex, setStartBtnIndex] = useState(
    Math.floor(currentPage / BtnLimit) * BtnLimit
  );
  const [lastBtnIndex, setLastBtnIndex] = useState(BtnLimit);
  const navigate = useNavigate();
  const BtnArr =
    items &&
    new Array(items.length)
      .fill()
      .map((item, index) => index)
      .slice(startBtnIndex, lastBtnIndex);
  const SaveStartIndex = items && BtnArr[0];
  const SaveLastIndex = items && BtnArr[BtnLimit - 1];
  useEffect(() => {
    if (items) {
      setPageCount(Math.ceil(items.length / itemsPerPage));
      if (currentPage - 1 === SaveStartIndex) {
        setStartBtnIndex((prev) =>
          currentPage < BtnLimit ? 0 : prev - BtnLimit
        );
      } else if (currentPage - 1 === SaveLastIndex) {
        setStartBtnIndex((prev) =>
          currentPage < BtnLimit ? 0 : prev + BtnLimit
        );
      }
      setLastBtnIndex(
        startBtnIndex + BtnLimit > pageCount
          ? pageCount
          : startBtnIndex + BtnLimit
      );
    }
  }, [items, itemsPerPage, currentPage, BtnLimit, startBtnIndex, BtnArr]);
  return (
    <>
      {items && (
        <>
          <div></div>
          <ul>
            {BtnArr.map((item, index) => {
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
