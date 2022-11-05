import { useState } from "react";
import { useFirestore } from "react-redux-firebase";

function TagMenu() {
  const [tag, setTag] = useState("");
  const firestore = useFirestore();
  const onChange = (e) => {
    setTag(e.target.value);
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            firestore.collection("tags").add({ tag });
          }}
        >
          <input
            onChange={onChange}
            type="text"
            placeholder="추가할 태그를 입력해주세요"
          />
          <button type="submit">+</button>
        </form>
      </div>
    </div>
  );
}

export default TagMenu;
