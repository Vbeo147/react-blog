import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useFirestore } from "react-redux-firebase";

function WritePage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const firestore = useFirestore();
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onTextChange = (data) => {
    setText(data);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    firestore.collection("test").add({
      title: title,
      text: text,
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            onChange={onTitleChange}
            type="text"
            placeholder="제목"
            required
          />
          <CKEditor
            editor={ClassicEditor}
            data=""
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
