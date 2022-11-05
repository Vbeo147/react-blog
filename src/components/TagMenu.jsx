import React, { useState } from "react";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

function TagMenu() {
  const [tag, setTag] = useState("");
  const firestore = useFirestore();
  useFirestoreConnect({
    collection: "tags",
  });
  const tagSelector = useSelector((state) => state.firestore.data.tags);
  const onChange = (e) => {
    setTag(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    firestore.collection("tags").add({ tag });
    setTag("");
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
            value={tag}
            type="text"
            placeholder="추가할 태그를 입력해주세요"
          />
          <button type="submit">+</button>
        </form>
      </div>
      <ul>
        {tagSelector &&
          Object.keys(tagSelector)
            .filter((item) => tagSelector[item]?.tag !== (null || undefined))
            .map((item, index) => {
              return (
                <li key={index}>
                  {tagSelector[item]?.tag}
                  <button
                    onClick={() => {
                      firestore.doc(`tags/${item}`).delete();
                    }}
                  >
                    X
                  </button>
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default TagMenu;
