import { NavLink } from "react-router-dom";
import menu from '../../assets/menu.svg';

export const SideNav = () => {
  return (
    <>
      <div className="drawer h-[calc(100vh-4rem)]">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button rounded-full w-13 h-13 scale-95 hover:scale-120"
          >
            <img src={menu} alt="" className="w-11 h-11" />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

          <ul className="menu bg-base-200 text-base-content h-full w-80 p-4 space-y-2">
            <h3 className="drawer-title text-left text-background mb-6">MENU</h3>

            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/dreambud", label: "DreamBud" },
              { to: "/trek", label: "Trek" },
              { to: "/spendsense", label: "SpendSense" },
            ].map((item) => (
              <li key={item.to} className="relative overflow-hidden group rounded-lg">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative z-10 block px-6 py-4 rounded-lg transition-colors duration-300 
                     ${isActive ? "bg-primary text-white" : "text-base-content"}`
                  }
                >
                  {item.label}
                </NavLink>
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 rounded-lg"></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
