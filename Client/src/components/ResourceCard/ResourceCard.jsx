import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ResourceCard = ({ data }) => {
  // Store the URL in a variable
  const resourceUrl = data.url;
  //{console.log(resourceUrl)}

  console.log("Resource Link:", resourceUrl); // Log the URL for debugging

  return (
    <Link to={`/view-resource-details/${data._id}`}>
      <div className="bg-zinc-800 rounded p-4 flex flex-col">
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img
            src={data.image}
            alt={data.title || "Resource"}
            className="w-full h-[25vh] object-cover rounded"
          />
        </div>
        <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
        <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
        <p className="mt-2 text-zinc-400 font-semibold">Category: {data.category}</p>
      </div>
    </Link>
  );
};

// PropTypes for ResourceCard
ResourceCard.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string.isRequired, // Ensure the URL is present and required
    title: PropTypes.string,
    author: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ResourceCard;
