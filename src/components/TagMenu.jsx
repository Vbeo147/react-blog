import React, { useState, useEffect } from "react";
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
            type="text"
            placeholder="추가할 태그를 입력해주세요"
          />
          <button type="submit">+</button>
        </form>
      </div>
      <ul>
        {tagSelector &&
          Object.values(tagSelector).map((item, index) => (
            <li key={index}>{item.tag}</li>
          ))}
      </ul>
    </div>
  );
}

export default TagMenu;
