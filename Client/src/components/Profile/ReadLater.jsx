import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../Loder";
import ResourceCard from "../components/ResourceCard/ResourceCard";

const ReadLater = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [readLaterResources, setReadLaterResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadLaterResources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/readlater/fetch-all-resource-from-read-later",
          {
            headers: {
              id: userId,
            },
          }
        );
        setReadLaterResources(response.data.data);
      } catch (error) {
        console.error("Error fetching Read Later resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReadLaterResources();
  }, [userId]);

  const removeFromReadLater = async (resourceId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/readlater/delete-resource-from-read-later",
        {},
        {
          headers: {
            resourceid: resourceId,
            id: userId,
          },
        }
      );
      setReadLaterResources((prev) =>
        prev.filter((resource) => resource._id !== resourceId)
      );
    } catch (error) {
      console.error("Error removing resource from Read Later:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 text-white px-12 py-8 min-h-screen h-auto">
      <h4 className="text-3xl text-yellow-200 mb-8">Read Later</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {readLaterResources.map((resource) => (
          <div key={resource._id} className="relative">
            <ResourceCard data={resource} />
            <button
              onClick={() => removeFromReadLater(resource._id)}
              className="absolute top-2 right-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-lg"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadLater;
