import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";

function WritePage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [select, setSelect] = useState("");
  const navigate = useNavigate();
  const firestore = useFirestore();
  useFirestoreConnect({
    collection: "tags",
  });
  const tagSelector = useSelector((state) => state.firestore.data.tags);
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onTextChange = (data) => {
    setText(data);
  };
  const onSelectChange = (e) => {
    setSelect(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await firestore.collection("write").add({
      tagName: select,
      info: { title, text },
    });
    setTitle("");
    setText("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <input
              onChange={onTitleChange}
              value={title || ""}
              type="text"
              placeholder="제목"
              required
            />
            <select onChange={onSelectChange}>
              <option>태그를 선택해주세요</option>
              {tagSelector &&
                Object.keys(tagSelector)
                  .filter(
                    (item) =>
                      tagSelector[item]?.CheckUndefined !== (null || undefined)
                  )
                  .map((item, index) => <option key={index}>{item}</option>)}
            </select>
          </div>
          <CKEditor
            editor={ClassicEditor}
            data={text || ""}
            config={{
              placeholder: "내용을 입력하세요",
              toolbar: ["bold", "italic"],
            }}
            onChange={(_, editor) => {
              const data = editor.getData();
              onTextChange(data);
            }}
          />
        </div>
        <div>
          <button type="submit">Enter</button>
          <button onClick={() => navigate(-1)}>Close</button>
        </div>
      </form>
    </div>
  );
}

export default WritePage;
