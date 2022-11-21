export const CustomToolbar = () => (
  <div id="toolbar" className="w-[720px] 2xl:w-[1000px]">
    <select
      className="ql-header toolbar-border"
      value=""
      onChange={() => console.log("")}
    >
      <option value="1">본문크기</option>
      <option value="2">본문크기2</option>
      <option value="3">본문크기3</option>
      <option value="0">본문 취소</option>
    </select>
    <div className="flex flex-row items-center">
      <div className="toolbar-border">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
        <button className="ql-blockquote"></button>
      </div>
      <div className="toolbar-border">
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
      </div>
      <div className="toolbar-border">
        <button className="ql-link"></button>
        <button className="ql-image"></button>
      </div>
    </div>
  </div>
);