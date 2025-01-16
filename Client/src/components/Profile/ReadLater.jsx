import axios from "axios";
import { useEffect, useState } from "react";

const ReadLater = () => {
  const [userData, setUserData] = useState(null); // State to store user info
  const [readLaterResources, setReadLaterResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token"); // Get token from sessionStorage
        if (!token) {
          setError(true);
          return;
        }
        const response = await axios.get("http://localhost:3000/api/user/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.userData); // Set userData in state
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(true);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    // Fetch Read Later resources only if userData is available
    const fetchReadLaterResources = async () => {
      if (!userData) return; // Don't fetch if userData is not yet available

      const headers = {
        id: userData.id, // Use userData.id here
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(
          "http://localhost:3000/api/readlater/fetch-all-resource-from-read-later",
          { headers }
        );
        setReadLaterResources(response.data.data); // Set resources in state
      } catch (err) {
        console.error("Error fetching Read Later resources:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReadLaterResources();
  }, [userData]); // This useEffect will run when userData changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load data. Please try again later.</div>;
  }

  return (
    <div>
      <h4 className="text-3xl text-yellow-200 mb-8">Read Later</h4>
      <div>
        {readLaterResources.length > 0 ? (
          <div>
            {readLaterResources.map((resource) => (
              <div key={resource._id}>
                <p>{resource.title}</p>
                {/* Display more resource information here */}
              </div>
            ))}
          </div>
        ) : (
          <p>No resources in your Read Later list.</p>
        )}
      </div>
    </div>
  );
};

export default ReadLater;
