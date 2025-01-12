import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Use FaSignOutAlt instead

const Sidebar = ({ userData }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]">
      {/* User Profile Section */}
      <div className="flex items-center flex-col justify-center">
        <img
          src={userData?.avatar || "https://via.placeholder.com/150"}
          className="h-[12vh] rounded-full"
          alt="User Avatar"
        />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {userData?.name || "Guest"}
        </p>
        <p className="text-zinc-100 font-semibold text-sm">
          {userData?.email || "No email provided"}
        </p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      {/* Navigation Links */}
      <div className="w-full flex flex-col items-center justify-between mt-4">
        <Link
          to="/profile/read-later"
          className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
        >
          Read Later
        </Link>
        <Link
          to="/profile/downloads"
          className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
        >
          Downloads
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
        >
          Settings
        </Link>
      </div>

      {/* Logout Button */}
      <button
        className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
        onClick={handleLogout}
      >
        Log Out <FaSignOutAlt className="ml-4" />
      </button>
    </div>
  );
};

export default Sidebar;
