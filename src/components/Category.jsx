import React, { useState } from "react";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Category() {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const firestore = useFirestore();
  useFirestoreConnect(["categorys", "write"]);
  const categorySelector = useSelector(
    (state) => state.firestore.data.categorys
  );
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const onChange = (e) => {
    setCategory(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    firestore.collection("categorys").doc(category).set({
      CheckUndefined: "",
    });
    setCategory("");
  };
  return (
    <div
      style={{
        width: "280px",
        height: "100vh",
        border: "1px solid black",
      }}
    >
      <div>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            value={category}
            type="text"
            placeholder="추가할 태그를 입력해주세요"
            required
          />
          <button type="submit">+</button>
        </form>
      </div>
      <div>
        {categorySelector &&
          Object.keys(categorySelector)
            .filter((categoryName) => {
              return (
                categorySelector[categoryName]?.CheckUndefined !==
                (null || undefined)
              );
            })
            .map((ulCategoryName, index) => {
              return (
                <ul key={index}>
                  {ulCategoryName}
                  <button
                    onClick={() =>
                      firestore.doc(`categorys/${ulCategoryName}`).delete()
                    }
                  >
                    X
                  </button>
                  {writeSelector &&
                    Object.keys(writeSelector)
                      .filter(
                        (id) =>
                          writeSelector[id]?.categoryName === ulCategoryName
                      )
                      .map((writeID, index) => {
                        return (
                          <li key={index}>
                            <span onClick={() => navigate(`/${writeID}`)}>
                              {writeSelector[writeID].info.title}
                            </span>
                            <button
                              onClick={() =>
                                firestore.doc(`write/${writeID}`).delete()
                              }
                            >
                              X
                            </button>
                          </li>
                        );
                      })}
                </ul>
              );
            })}
      </div>
    </div>
  );
}

export default Category;
