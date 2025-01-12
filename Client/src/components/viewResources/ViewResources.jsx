import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loder";
import { FaBookReader, FaFileDownload, FaReadme } from "react-icons/fa";

const ViewResources = () => {
  const { id } = useParams(); // Extract resource ID from URL
  const [data, setData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(false); // Track error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/resource/get-resource-by-id/${id}`
        );
        setData(response.data.data); // Set fetched data
      } catch (error) {
        console.error("Error fetching resource:", error);
        setError(true); // Set error state if request fails
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchData();
  }, [id]); // Add `id` to dependency array

  // Render loading state
  if (loading) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="h-screen bg-zinc-900 flex items-center justify-center">
        <p className="text-red-500">Failed to load resource. Please try again later.</p>
      </div>
    );
  }

  // Render resource details
  return (
    data && (
      <div className="h-full w-full bg-zinc-900 flex flex-col items-start px-8 py-8">
        {/* Main Content Box */}
        <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-zinc-800 rounded-lg p-6">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <div className="h-[88vh] bg-zinc-900 rounded flex justify-center items-center p-4">
              <img
                src={data.image}
                alt={data.title}
                className="h-full max-h-[88vh] object-contain rounded"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
            <h1 className="text-4xl text-white font-bold">{data.title}</h1>
            <p className="text-lg text-zinc-400 mt-2">By {data.author}</p>
            <p className="text-lg text-zinc-500 mt-4">{data.desc}</p>
            <p className="text-lg text-zinc-400 font-medium mt-4">
              Category: {data.category}
            </p>

            {/* Buttons Section */}
            <div className="mt-8 flex flex-wrap gap-6">
              <button className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition-all duration-300 cursor-pointer text-lg">
                <FaBookReader size={20} />
                Read Later
              </button>

              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all duration-300 cursor-pointer text-lg"
              >
                <FaFileDownload size={20} />
                Download
              </a>

              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300 cursor-pointer text-lg"
              >
                <FaReadme size={20} />
                Read Now
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewResources;
