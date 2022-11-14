import ImageResize from "quill-image-resize";
import { Quill } from "react-quill";

const Quillformats = [
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

export default Quill.register("modules/ImageResize", ImageResize);

export const formats = Quillformats;
