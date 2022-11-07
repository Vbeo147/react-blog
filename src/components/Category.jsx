import React, { useState } from "react";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

function Category() {
  const [category, setCategory] = useState("");
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
        width: "300px",
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
            .filter((item) => {
              return (
                categorySelector[item]?.CheckUndefined !== (null || undefined)
              );
            })
            .map((item, index) => {
              return (
                <ul key={index}>
                  {item}
                  <button
                    onClick={() => firestore.doc(`tags/${item}`).delete()}
                  >
                    X
                  </button>
                  {writeSelector &&
                    Object.keys(writeSelector)
                      .filter(
                        (key) => writeSelector[key]?.categoryName === item
                      )
                      .map((info, index) => {
                        return (
                          <li key={index}>
                            {writeSelector[info].info.title}
                            <button
                              onClick={() =>
                                firestore.doc(`write/${info}`).delete()
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
