import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function WritePage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onTextChange = (data) => {
    setText(data);
  };
  console.log(title, text);
  return (
    <div>
      <form>
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
            onChange={(_, editor) => {
              const data = editor.getData();
              onTextChange(data);
            }}
          />
        </div>
        <div>
          <button>Enter</button>
          <button onClick={() => navigate(-1)}>Close</button>
        </div>
      </form>
    </div>
  );
}

export default WritePage;
