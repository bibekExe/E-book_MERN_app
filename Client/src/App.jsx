// Import necessary components and pages
import Home from './pages/Home';
import Resource from './pages/resource';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LogIn from './pages/login';
import Signup from './pages/signup';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';

import { Routes, Route } from "react-router-dom";
import ViewResources from './components/viewResources/ViewResources';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resource />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="view-resource-details/:id" element={<ViewResources />} />
          <Route
            path="*"
            element={
              <div className="text-center py-16 text-red-600 text-xl">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
