import { useEffect, useState, useRef } from "react";

function AboutPage() {
  const [slide, setSlide] = useState(true);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      if (slide) {
        setSlide(false);
        if (deltaY < 0 && page > 0) {
          setPage(page - 1);
        } else if (deltaY > 0) {
          setPage(page + 1);
        }
        window.scrollTo({
          top: window.innerHeight * page,
          behavior: "smooth",
        });
        setSlide(true);
      }
      console.log(page);
    };
    const containerRefCurrent = containerRef.current;
    containerRefCurrent.addEventListener("wheel", onWheel);
    return () => {
      containerRefCurrent.removeEventListener("wheel", onWheel);
    };
  }, [page, slide]);
  return (
    <div className="main-padding" ref={containerRef}>
      <div className="inner">1</div>
      <div className="inner">2</div>
      <div className="inner">3</div>
      <div className="inner">4</div>
    </div>
  );
}

export default AboutPage;
