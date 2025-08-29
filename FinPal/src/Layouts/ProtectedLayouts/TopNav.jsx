import bell from "../../assets/bell.svg";
export const TopNav = () => {
  return (
    <nav className="navbar bg-primary fixed top-0 w-full shadow-base-300/20 shadow-sm px-10">
      <div className="logo flex flex-1 items-center text-white text-heading2">
        FinPal
      </div>

      <div className="navbar-end flex items-center gap-4 ">
        <button className="bg-gray-300 hover:bg-gray-500 font-bold py-2 px-3 rounded">
          <div className="indicator mt-1">
            <span className="indicator-item bg-error  w-2 h-2 rounded-full"></span>
            <img src={bell} alt="Notification bell" className="w-6 h-6  " />
          </div>
        </button>

        <div className="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
          <span className="text-white py-2 px-4">Sarah Johnson</span>
          <button
            id="dropdown-scrollable"
            type="button"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
            className="bg-accent text-white font-bold py-2 px-4 btn-circle hover:bg-accent"
          >
            S
          </button>
        </div>
      </div>
    </nav>
  );
};
