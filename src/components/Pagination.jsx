import CurrentList from "./CurrentList";
import { useState, useEffect } from "react";

function Pagination({ itemsPerPage, items }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(3);
  const BtnLimit = 5;
  useEffect(() => {}, []);
  return (
    <>
      <div>{/* Components CurrentList */}</div>
      <ul>
        {new Array(BtnLimit).fill().map((item, index) => {
          const CurrentBtnNumber = index + 1;
          return (
            <li
              onClick={() => console.log(CurrentBtnNumber)}
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
