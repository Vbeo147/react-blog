function TagMenu() {
  const Tags = ["ReactJS", "Firebase"];
  return (
    <div
      style={{
        width: "300px",
        height: "100vh",
        border: "1px solid black",
      }}
    >
      {Tags.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}

export default TagMenu;
