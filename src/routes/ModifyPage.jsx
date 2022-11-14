import {
  useFirebase,
  useFirestore,
  useFirestoreConnect,
} from "react-redux-firebase";
import { useState, useRef, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import readFileAsync from "../components/readFileAsync";
import formats from "../components/QuillFormats";
import ReactQuill, { Quill } from "react-quill";

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
  useEffect(() => {
    if (writeSelector) {
      setTitle(writeSelector[id].info.title);
      setQuill(writeSelector[id].info.text);
    }
  }, [writeSelector]);
  return (
    <>
      {writeSelector ? (
        <form onSubmit={onSubmit}>
          <div>
            <div>
              <input
                onChange={onChange}
                value={title || ""}
                type="text"
                placeholder="제목"
                required
              />
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
            <button type="button" onClick={() => navigate("/")}>
              Close
            </button>
          </div>
        </form>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default ModifyPage;
