import { useEffect, useState, useRef } from "react";

function AboutPage() {
  const [slide, setSlide] = useState(true);
  const containerRef = useRef(null);
  let page = 0;
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const lastPage = 3;
      if (slide) {
        setSlide(false);
        if (deltaY < 0 && page !== 0) {
          page--;
        }
        if (deltaY > 0 && page !== lastPage) {
          page++;
        }
        window.scrollTo({
          top: window.innerHeight * page,
          behavior: "smooth",
        });
        console.log(page);
        setSlide(true);
      }
    };
    const containerRefCurrent = containerRef.current;
    containerRefCurrent.addEventListener("wheel", onWheel);
    return () => {
      containerRefCurrent.removeEventListener("wheel", onWheel);
    };
  }, [slide, page]);
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
