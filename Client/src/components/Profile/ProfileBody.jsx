import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const ProfileBody = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // State to manage active section

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          setError(true);
          return;
        }

        const response = await axios.get("http://localhost:3000/api/user/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data.userData);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-6">
              Welcome, {userData?.name}
            </h1>
            <div className="flex flex-col lg:flex-row items-center mb-8">
              <img
                src={userData?.avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full mb-4 lg:mb-0 lg:mr-6"
              />
              <div className="text-center lg:text-left">
                <p className="text-xl lg:text-2xl font-semibold text-white">
                  {userData?.name}
                </p>
                <p className="text-md lg:text-lg text-zinc-300">
                  {userData?.email}
                </p>
              </div>
            </div>
          </div>
        );
      case "readLater":
        return <div className="text-lg text-white">Books added to read later...</div>;
      case "downloads":
        return <div className="text-lg text-white">Your downloaded items...</div>;
      case "settings":
        return <div className="text-lg text-white">Settings page...</div>;
      default:
        return (
          <div className="text-lg text-zinc-300">
            Select an option from the sidebar to view details.
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-red-500">
        Failed to load user data. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-900 text-white">
      {/* Sidebar */}
      <div
        className="w-full lg:w-1/4 bg-zinc-800 p-4 flex flex-col"
        style={{ transition: "all 0.3s ease" }}
      >
        <Sidebar setActiveSection={setActiveSection} />
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 p-4 lg:p-8">{renderContent()}</div>
    </div>
  );
};

export default ProfileBody;
