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
import readFileAsync from "../components/readFileAsync";
import formats from "../components/QuillFormats";
import { CustomToolbar } from "../components/CustomToolbar";

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
  useFirestoreConnect(["categorys", "write"]);
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
      createdAt: Date.now(),
      info: { title, text: quill },
    });
    setValue("");
    setLoading(false);
    navigate("/");
  };
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", () => {
      const file = input.files[0];
      async function processFile() {
        try {
          const Url = await readFileAsync(file);
          // firebase storage putString and getDownloadURL - very inefficient :(
          let storageUrl = "";
          const storageRef = firebase.storage().ref().child(uuidv4());
          const response = await storageRef.putString(Url, "data_url");
          storageUrl = await response.ref.getDownloadURL();
          // editor add image
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
        container: "#toolbar",
        handlers: {
          image: imageHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    };
  }, []);
  return (
    <div className="p-[60px]">
      <form onSubmit={onSubmit} className="editor-form">
        <div className="components-input-container">
          <input
            className=""
            onChange={onChange}
            value={title || ""}
            type="text"
            placeholder="제목"
            required
            ref={titleRef}
          />
          <select onChange={onChange} required ref={selectRef}>
            {!select && <option value="">태그를 선택해주세요</option>}
            {categorySelector &&
              Object.keys(categorySelector)
                .filter(
                  (categoryName) =>
                    categorySelector[categoryName]?.CheckUndefined !==
                    (null || undefined)
                )
                .map((item, index) => <option key={index}>{item}</option>)}
          </select>
        </div>
        <div className="mb-6 border border-2 focus-within:border-black">
          <CustomToolbar />
          <ReactQuill
            className="w-[720px] 2xl:w-[1000px] h-auto"
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
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-row justify-between items-center">
            <button
              type="submit"
              disabled={loading}
              className="w-[100px] border border-2 border-gray-300 py-0.5 rounded-[5px] mr-5 hover:border-gray-400"
            >
              Enter
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-[100px] border border-2 border-gray-300 py-0.5 rounded-[5px] hover:border-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default WritePage;
