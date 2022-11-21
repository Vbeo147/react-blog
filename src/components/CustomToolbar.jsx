export const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" value="" onChange={() => console.log("")}>
      <option value="1"></option>
      <option value="2"></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-strike"></button>
    <button className="ql-blockquote"></button>
    <select className="ql-color" value="" onChange={() => console.log("")}>
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option value="black"></option>
    </select>
    <select
      value=""
      onChange={() => console.log("")}
      className="ql-background"
    ></select>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
  </div>
);
