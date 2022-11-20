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
    <div>
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
                <details key={index}>
                  <summary>
                    {ulCategoryName}{" "}
                    <button
                      onClick={() => {
                        firestore.doc(`categorys/${ulCategoryName}`).delete();
                        Object.keys(writeSelector)
                          .filter(
                            (ulID) =>
                              writeSelector[ulID].categoryName ===
                              ulCategoryName
                          )
                          .forEach((ulcurrentID) =>
                            firestore.doc(`write/${ulcurrentID}`).delete()
                          );
                      }}
                    >
                      X
                    </button>
                  </summary>

                  {writeSelector &&
                    Object.keys(writeSelector)
                      .filter(
                        (liID) =>
                          writeSelector[liID]?.categoryName === ulCategoryName
                      )
                      .map((licurrentID, index) => {
                        return (
                          <div key={index}>
                            <span
                              onClick={() => navigate(`/detail/${licurrentID}`)}
                            >
                              {writeSelector[licurrentID].info.title}
                            </span>
                            <button
                              onClick={() => {
                                firestore.doc(`write/${licurrentID}`).delete();
                                navigate("/");
                              }}
                            >
                              X
                            </button>
                            <button
                              onClick={() => navigate(`/modify/${licurrentID}`)}
                            >
                              T
                            </button>
                          </div>
                        );
                      })}
                </details>
              );
            })}
      </div>
    </div>
  );
}

export default Category;
