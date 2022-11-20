import Auth from "./Auth";
import Category from "./Category";

function Menu() {
  return (
    <div className="flex flex-col items-start border border-black w-[300px] h-[100vh]">
      <div className="mx-auto mt-10">
        <Auth />
      </div>
    </div>
  );
}

export default Menu;
