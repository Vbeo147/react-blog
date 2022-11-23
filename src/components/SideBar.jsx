import Auth from "./Sidebar/Auth";
import Category from "./Sidebar/Category";

function SideBar() {
  return (
    <div
      id="menu-scroll"
      className="fixed flex flex-col items-start w-[400px] h-full overflow-y-scroll"
    >
      <div className="mx-auto mt-10">
        <Auth />
      </div>
      <div className="mx-auto mt-10">
        <Category />
      </div>
    </div>
  );
}

export default SideBar;