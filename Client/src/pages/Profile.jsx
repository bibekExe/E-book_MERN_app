import ReadLater from "../components/Profile/ReadLater";
import Settings from "../components/Profile/settings.jsx";


const Profile = () => {
  return (
    <div className="flex bg-zinc-900 text-white min-h-screen">
      
      
      <div className="flex-grow px-10 py-8">
        <ReadLater />
        <Settings />
      </div>
    </div>
  );
};

export default Profile;
