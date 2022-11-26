import OverView from "./Sidebar/OverView";
import Category from "./Sidebar/Category";

function SideBar() {
  return (
    <div
      id="menu-scroll"
      className="fixed flex flex-col items-start w-[340px] h-full overflow-y-scroll bg-[#141514]"
    >
      <div className="mx-auto mt-10 w-full">
        <OverView />
      </div>
      <div className="mx-auto mt-10 w-full">
        <Category />
      </div>
    </div>
  );
}

export default SideBar;
