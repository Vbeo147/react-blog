import {
  useFirebase,
  useFirestore,
  useFirestoreConnect,
} from "react-redux-firebase";
import { useState, useRef, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";
import readFileAsync from "../components/readFileAsync";
import formats from "../components/QuillFormats";
import ReactQuill, { Quill } from "react-quill";
import { CustomToolbar } from "../components/CustomToolbar";

function ModifyPage() {
  const [title, setTitle] = useState("");
  const [quill, setQuill] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const quillRef = useRef();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const navigate = useNavigate();
  useFirestoreConnect(["write"]);
  const writeSelector = useSelector((state) => state.firestore.data.write);
  const onChange = (e) => {
    setTitle(e.target.value);
  };
  const onQuillChange = (html) => {
    setQuill(html);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await firestore.doc(`write/${id}`).update({
      info: { title, text: quill },
    });
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
  useEffect(() => {
    if (writeSelector) {
      setTitle(writeSelector[id].info.title);
      setQuill(writeSelector[id].info.text);
    }
  }, [writeSelector, id]);
  return (
    <div className="p-[60px]">
      {writeSelector ? (
        <form onSubmit={onSubmit} className="editor-form">
          <div className="components-input-container">
            <input
              onChange={onChange}
              value={title || ""}
              type="text"
              placeholder="제목"
              required
            />
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
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default ModifyPage;
