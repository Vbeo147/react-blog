import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PaginationBtn = styled.li`
  background: ${(props) => (props.background ? "lightgray" : "white")};
`;

function Pagination({
  itemsPerPage,
  items,
  currentPage,
  BtnLimit,
  setCurrentItems,
}) {
  const [pageCount, setPageCount] = useState(0);
  const [startBtnIndex, setStartBtnIndex] = useState(
    Math.floor(currentPage / BtnLimit) * BtnLimit
  );
  const [lastBtnIndex, setLastBtnIndex] = useState(BtnLimit);
  const navigate = useNavigate();
  const BtnArr = useMemo(
    () =>
      items &&
      new Array(items.length)
        .fill()
        .map((item, index) => index)
        .slice(startBtnIndex, lastBtnIndex),
    [items, startBtnIndex, lastBtnIndex]
  );
  const onPageChange = (page) => {
    navigate(`/page/${page}`);
  };
  //
  useEffect(() => {
    const isPageHome = currentPage < BtnLimit;
    const pageInterval = Math.ceil(BtnLimit / (BtnLimit * 2)) + 1;
    if (items) {
      setPageCount(Math.ceil(items.length / itemsPerPage));
      setStartBtnIndex(
        isPageHome
          ? 0
          : pageCount -
              pageInterval -
              (items.length - currentPage * itemsPerPage) -
              pageInterval +
              1
      );
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
  useEffect(() => {
    localStorage.setItem("page", currentPage);
  }, [currentPage]);
  //
  return (
    <>
      {items && (
        <>
          <ul className="flex flex-row items-center justify-center">
            {items.length !== 0 && (
              <>
                <button
                  disabled={currentPage === 1}
                  className="components-pagination-btn select-none mr-2 font-bold"
                  onClick={() => onPageChange(1)}
                >
                  {currentPage === 1 ? "--" : "<"}
                </button>
                {BtnArr.map((item, index) => {
                  return (
                    <PaginationBtn
                      background={currentPage === item + 1}
                      className="components-pagination-btn select-none mr-1"
                      onClick={() => onPageChange(item + 1)}
                      key={index}
                    >
                      {item + 1}
                    </PaginationBtn>
                  );
                })}
                <button
                  disabled={currentPage === pageCount}
                  className="components-pagination-btn select-none ml-2 font-bold"
                  onClick={() => onPageChange(pageCount)}
                >
                  {currentPage === pageCount ? "--" : ">"}
                </button>
              </>
            )}
          </ul>
        </>
      )}
    </>
  );
}

export default Pagination;
