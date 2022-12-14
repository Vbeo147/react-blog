import { useNavigate, useParams } from "react-router-dom";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  useFirebase,
  useFirestore,
  useFirestoreConnect,
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import readFileAsync from "../components/Editor/readFileAsync";
import formats from "../components/Editor/QuillFormats";
import { CustomToolbar } from "../components/Editor/CustomToolbar";

function WritePage() {
  const [title, setTitle] = useState("");
  const [select, setSelect] = useState("");
  const [quill, setQuill] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  //
  const quillRef = useRef();
  //
  const navigate = useNavigate();
  const firestore = useFirestore();
  const firebase = useFirebase();
  useFirestoreConnect(["categorys", "write"]);
  const categorySelector = useSelector(
    (state) => state.firestore.data.categorys
  );
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const isWrite = writeSelector && writeSelector[id];
  const onTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const onSelectChange = useCallback((e) => {
    setSelect(e.target.value);
  }, []);
  const onQuillChange = useCallback((html) => {
    setQuill(html);
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const textReplace = /<[^>]*>?/g;
    const today = Date.now();
    setLoading(true);
    if (isWrite) {
      await firestore.doc(`write/${id}`).update({
        time: {
          ...writeSelector[id].time,
          updatedAt: Date.now(),
          isUpdate: true,
        },
        info: { title, Quilltext: quill, text: quill.replace(textReplace, "") },
      });
    } else {
      await firestore.collection("write").add({
        categoryName: select,
        time: { createdAt: today, updatedAt: today, isUpdate: false },
        info: { title, Quilltext: quill, text: quill.replace(textReplace, "") },
      });
      setTitle("");
    }
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
          // firebase storage putString and getDownloadURL
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
  useEffect(() => {
    quillRef.current?.editor.root.setAttribute("spellcheck", "false");
  }, []);
  useEffect(() => {
    if (isWrite) {
      setTitle(writeSelector[id].info.title);
      setQuill(writeSelector[id].info.Quilltext);
    }
  }, [writeSelector, id]);
  return (
    <div className="main-padding">
      <form onSubmit={onSubmit} className="editor-form">
        <div className="components-input-container">
          <input
            spellCheck="false"
            className=""
            onChange={onTitleChange}
            value={title || ""}
            type="text"
            placeholder="??????"
            required
          />
          {!isWrite && (
            <select onChange={onSelectChange} required>
              {!select && <option value="">????????? ??????????????????</option>}
              {categorySelector &&
                Object.keys(categorySelector)
                  .filter(
                    (categoryName) =>
                      categorySelector[categoryName]?.CheckUndefined !==
                      (null || undefined)
                  )
                  .map((item, index) => <option key={index}>{item}</option>)}
            </select>
          )}
        </div>
        <div className="mb-6 border border-2 focus-within:border-black">
          <CustomToolbar />
          <ReactQuill
            id="editor"
            className="w-full h-auto"
            spellCheck="false"
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
              onClick={() => {
                const beforepage = localStorage.getItem("page");
                navigate(`/page/${beforepage}`);
              }}
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
