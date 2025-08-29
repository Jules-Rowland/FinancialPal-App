import { Outlet } from "react-router-dom";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";
function PrivateLayout() {
  return (
    <div>
      <TopNav />

      <div className="flex z-50  mt-20 h-[calc(100vh-4rem)]">
        <div className="">
          <SideNav />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default PrivateLayout;
