// Import required libraries and modules
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth"; // Corrected path for auth actions

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role); // Fetch user role from Redux
  const data = JSON.parse(sessionStorage.getItem("user")) || {}; // Fetch user data from sessionStorage

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]">
      <div className="flex items-center flex-col justify-center">
        <img
          src={data?.avatar || "https://via.placeholder.com/150"}
          className="h-[12vh] rounded-full"
          alt="User Avatar"
        />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data?.name || "Guest"}
        </p>
        <p className="text-zinc-100 font-semibold text-sm">
          {data?.email || "No email provided"}
        </p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      {/* User-specific links */}
      {role === "user" && (
        <div className="w-full flex lg:hidden items-center justify-between mt-4">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
          >
            Downloads
          </Link>
          <Link
            to="/profile/recently-read"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
          >
            Recently Read
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
          >
            Settings
          </Link>
        </div>
      )}

      {/* Admin-specific links */}
      {role === "admin" && (
        <div className="w-full flex lg:hidden items-center justify-between mt-4">
          <Link
            to="/profile/add-resources"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
          >
            Add Resources
          </Link>
          <Link
            to="/profile/update-resources"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
          >
            Update Resources
          </Link>
          <Link
            to="/profile/delete-resources"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
          >
            Delete Resources
          </Link>
          <Link
            to="/profile/view-all-users"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
          >
            View All Users
          </Link>
          <Link
            to="/profile/mail-all-users"
            className="text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all duration-300 py-2"
          >
            Mail All Users
          </Link>
        </div>
      )}

      {/* Log Out Button */}
      <button
        className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          sessionStorage.clear(); // Clear sessionStorage on logout
          navigate("/");
        }}
      >
        Log Out <FaArrowRightFromBracket className="ml-4" />
      </button>
    </div>
  );
};

export default Sidebar;
