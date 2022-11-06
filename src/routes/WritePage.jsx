import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
  ];
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
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={text || ""}
            onChange={(content, delta, source, editor) =>
              onTextChange(editor.getHTML())
            }
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
