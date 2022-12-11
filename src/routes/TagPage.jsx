import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ToggleBtn = styled.button`
  background: ${(props) => (props.background ? "lightgray" : "white")};
`;

function TagPage() {
  const [toggle, setToggle] = useState([]);
  useFirestoreConnect(["categorys", "write"]);
  const categorySelector = useSelector(
    (state) => state.firestore.data.categorys
  );
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const navigate = useNavigate();
  return (
    <>
      <div className="main-padding w-full">
        <div className="flex flex-wrap w-[800px] 2xl:w-[1200px] mb-20">
          {categorySelector && (
            <>
              {Object.keys(categorySelector)
                .filter((categoryName) => {
                  return (
                    categorySelector[categoryName]?.CheckUndefined !==
                    (null || undefined)
                  );
                })
                .map((item, index) => {
                  return (
                    <ToggleBtn
                      onClick={() => {
                        const isEmpty = !toggle.find(
                          (toggles) => toggles === item
                        );
                        if (isEmpty) {
                          setToggle((prev) => [...prev, item]);
                        } else if (!isEmpty) {
                          setToggle((prev) =>
                            prev.filter((toggles) => toggles !== item)
                          );
                        }
                      }}
                      background={toggle.find((toggles) => toggles === item)}
                      className="mr-5 cursor-pointer select-none border border-2 border-gray-300 px-1.5 py-1 rounded-[5px] w-1/10"
                      key={index}
                    >
                      {item}
                    </ToggleBtn>
                  );
                })}
            </>
          )}
        </div>
        <div className="flex flex-col items-center justify-start w-full">
          {writeSelector && (
            <>
              {toggle.map((item) =>
                Object.keys(writeSelector)
                  .map((id) => {
                    return { item: writeSelector[id], id: id };
                  })
                  .filter((Obj) => Obj?.item.categoryName === item)
                  .map((current, index) => {
                    const CurrentItem = current.item;
                    if (CurrentItem.categoryName) {
                      return (
                        <div
                          onClick={() => navigate(`/detail/${current.id}`)}
                          key={index}
                          className="flex flex-row justify-start items-center mb-5 cursor-pointer select-none w-full"
                          id="tag-container"
                        >
                          <span className="font-bold w-full">
                            {`[ ${CurrentItem.categoryName} ]`}
                            <span className="ml-10">
                              {CurrentItem.info.title}
                            </span>
                          </span>
                        </div>
                      );
                    }
                  })
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TagPage;
