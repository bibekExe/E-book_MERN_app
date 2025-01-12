import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

// Import necessary components and pages
import Home from './pages/Home';
import Resource from './pages/resource';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LogIn from './pages/login';
import Signup from './pages/signup';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
<<<<<<< Updated upstream

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewResources from './components/viewResources/ViewResources';
=======
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import Downloads from './components/Profile/Downloads';
import RecentlyRead from './components/Profile/RecentlyRead';
import Settings from './components/Profile/Settings';
import AddResources from './components/Profile/AddResources';
import UpdateResources from './components/Profile/UpdateResources';
>>>>>>> Stashed changes

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
<<<<<<< Updated upstream
      <Router>
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
            
            <Route path="*" element={<div className="text-center py-16 text-red-600 text-xl">404 - Page Not Found</div>} />
          </Routes>
        </div>
        <Footer />
      </Router>
=======
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resource />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/downloads" element={<Downloads />} />
          {role === "user" && <Route path="/profile/add-resources" element={<AddResources />} />}
          {role === "admin" && <Route path="/profile/update-resources" element={<UpdateResources />} />}
          <Route path="/profile/recently-read" element={<RecentlyRead />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book/:id" element={<ViewBookDetails />} />
          <Route path="*" element={<div className="text-center py-16 text-red-600 text-xl">404 - Page Not Found</div>} />
        </Routes>
      </div>
      <Footer />
>>>>>>> Stashed changes
    </div>
  );
};

export default App;
