import CurrentList from "./CurrentList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PaginationBtn = styled.li`
  border: 3px solid lightgray;
  border-radius: 10px;
  margin-right: 5px;
  padding: 0.2rem 0.7rem 0.2rem 0.7rem;
  cursor: pointer;
  background: ${(props) => (props.background ? "lightgray" : "white")};
`;

function Pagination({ itemsPerPage, items, currentPage, BtnLimit }) {
  const [currentItems, setCurrentItems] = useState([]);
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
  //
  useEffect(() => {
    const isHome = currentPage < BtnLimit;
    if (items) {
      setPageCount(Math.ceil(items.length / itemsPerPage));
      if (pageCount > BtnLimit && currentPage !== pageCount) {
        if (SaveStartIndex === currentPage - 1) {
          setStartBtnIndex((prev) => (isHome ? 0 : prev - BtnLimit));
        } else if (SaveLastIndex === currentPage - 1) {
          setStartBtnIndex((prev) => (isHome ? 0 : prev + BtnLimit));
        }
      }
      setLastBtnIndex(
        startBtnIndex + BtnLimit > pageCount
          ? pageCount
          : startBtnIndex + BtnLimit
      );
    }
  }, [items, currentPage, startBtnIndex, BtnArr, pageCount]);
  useEffect(() => {
    const itemOffset = (currentPage - 1) * itemsPerPage;
    const endOffset = itemOffset + itemsPerPage;
    if (items) {
      setCurrentItems(items.slice(itemOffset, endOffset));
    }
  }, [currentPage, items]);
  //
  return (
    <>
      {items && (
        <>
          <div className="mb-5">
            <CurrentList currentItems={currentItems} />
          </div>
          <ul className="flex flex-row items-center justify-center">
            {BtnArr.map((item, index) => {
              return (
                <PaginationBtn
                  background={currentPage === item + 1}
                  onClick={() => navigate(`/page/${item + 1}`)}
                  key={index}
                >
                  {item + 1}
                </PaginationBtn>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

export default Pagination;
