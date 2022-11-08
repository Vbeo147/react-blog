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
  const [value, setValue] = useState({ title: "", select: "" });
  const [quill, setQuill] = useState("");
  const [loading, setLoading] = useState(false);
  const { title, select } = value;
  const titleRef = useRef();
  const selectRef = useRef();
  const quillRef = useRef();
  const navigate = useNavigate();
  const firestore = useFirestore();
  const firebase = useFirebase();
  useFirestoreConnect(["categorys"]);
  const categorySelector = useSelector(
    (state) => state.firestore.data.categorys
  );
  const onChange = () => {
    setValue({
      title: titleRef.current.value,
      select: selectRef.current.value,
    });
  };
  const onQuillChange = (html) => {
    setQuill(html);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await firestore.collection("write").add({
      categoryName: select,
      info: { title, text: quill },
    });
    setValue({
      title: "",
      select: "",
    });
    setLoading(false);
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
              onChange={onChange}
              value={title || ""}
              type="text"
              placeholder="제목"
              required
              ref={titleRef}
            />
            <select onChange={onChange} required ref={selectRef}>
              <option value="">태그를 선택해주세요</option>
              {categorySelector &&
                Object.keys(categorySelector)
                  .filter(
                    (item) =>
                      categorySelector[item]?.CheckUndefined !==
                      (null || undefined)
                  )
                  .map((item, index) => <option key={index}>{item}</option>)}
            </select>
          </div>
          <ReactQuill
            theme="snow"
            ref={quillRef}
            modules={modules}
            formats={formats}
            value={quill || ""}
            onChange={(content, delta, source, editor) =>
              onQuillChange(editor.getHTML())
            }
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            Enter
          </button>
          <button onClick={() => navigate(-1)}>Close</button>
        </div>
      </form>
    </div>
  );
}

export default WritePage;
