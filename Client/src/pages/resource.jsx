import  { useState, useEffect } from "react";
import Loader from "../components/Loder";
import ResourceCard from "../components/ResourceCard/ResourceCard";
import axios from "axios";
import { TbCategory } from "react-icons/tb";

const Resource = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Books", "Documents", "Court Hearings", "Case Studies", "Newspapers"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://e-book-mern-app.onrender.com/api/resource/get-all-resource"
        );
        setData(response.data.data);
        setFilteredData(response.data.data); // Set initial filtered data
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter logic based on search term and category
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(lowerSearchTerm) ||
        item.author.toLowerCase().includes(lowerSearchTerm) ||
        item.category.toLowerCase().includes(lowerSearchTerm);

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
    setFilteredData(filtered);
  }, [searchTerm, selectedCategory, data]);

  return (
    <div className="bg-zinc-900 text-white px-12 py-8 min-h-screen h-auto">
      <h4 className="text-3xl text-yellow-200">Resources</h4>

      {/* Search Bar */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by category, author, or book name..."
          className="w-full p-2 rounded-md text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex space-x-4 my-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              selectedCategory === category
                ? "bg-yellow-400 text-black"
                : "bg-gray-700 text-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <TbCategory />
            <span>{category}</span>
          </button>
        ))}
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Display Filtered Data */}
          {filteredData.length > 0 ? (
            filteredData.map((item, i) => <ResourceCard key={i} data={item} />)
          ) : (
            <p className="text-yellow-400">No resources found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Resource;
