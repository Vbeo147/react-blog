import { useNavigate } from "react-router-dom";
import { useState, useMemo, useRef } from "react";
import {
  useFirebase,
  useFirestore,
  useFirestoreConnect,
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
Quill.register("modules/ImageResize", ImageResize);

function WritePage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [select, setSelect] = useState("");
  const quillRef = useRef();
  const navigate = useNavigate();
  const firestore = useFirestore();
  const firebase = useFirebase();
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
    navigate(-1);
  };
  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files[0];
      async function processFile() {
        try {
          const Url = await readFileAsync(file);
          // firebase storage putString and getDownloadURL - very inefficient :(
          let storageUrl = "";
          const storageRef = firebase.storage().ref().child(uuidv4());
          const response = await storageRef.putString(Url, "data_url");
          storageUrl = await response.ref.getDownloadURL();
          // editor set image
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", storageUrl);
        } catch (error) {
          console.log(error);
        }
      }
      processFile();
    });
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ indent: "-1" }, { indent: "+1" }],
          ["link", "image"],
          [{ color: [] }, { background: [] }],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    };
  }, []);
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
            <select onChange={onSelectChange} required>
              <option value="">태그를 선택해주세요</option>
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
            ref={quillRef}
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