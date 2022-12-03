import { useEffect, useRef } from "react";

function AboutPage() {
  const containerRef = useRef(null);
  const lastPage = 3;
  let page = 0;
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      const { deltaY } = e;

      if (deltaY < 0 && page !== 0) {
        page--;
      }
      if (deltaY > 0 && page !== lastPage) {
        page++;
      }
      window.scrollTo({
        top: window.innerHeight * page + 50,
        behavior: "smooth",
      });
    };
    const containerRefCurrent = containerRef.current;
    containerRefCurrent.addEventListener("wheel", onWheel);
    document.body.classList.add("stop-scrolling");
    return () => {
      containerRefCurrent.removeEventListener("wheel", onWheel);
      document.body.classList.remove("stop-scrolling");
    };
  }, [page, lastPage]);
  return (
    <div className="pr-10 py-[50px] w-full" ref={containerRef}>
      <div className="full-page"></div>
      <div className="full-page bg-blue-300">2</div>
      <div className="full-page bg-yellow-300">3</div>
      <div className="full-page bg-green-300">4</div>
    </div>
  );
}

export default AboutPage;
