import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const ProfileBody = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the token from sessionStorage
        const token = sessionStorage.getItem("token");
        if (!token) {
          setError(true);
          return;
        }

        // Fetch user data from the API
        const response = await axios.get("http://localhost:3000/api/user/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data.userData); // Update the state with user data
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
    <div className="flex min-h-screen bg-zinc-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-zinc-800 p-4 flex flex-col items-center">
        <Sidebar data={userData} />
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Welcome, {userData?.name}</h1>
        <p className="text-lg text-zinc-300">
          Here you can view your "Read Later" items, manage your downloads, and update your profile settings.
        </p>
      </div>
    </div>
  );
};

export default ProfileBody;
