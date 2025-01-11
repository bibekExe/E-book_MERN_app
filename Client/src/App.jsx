// Import necessary components and pages
import Home from './pages/Home';
import Resource from './pages/resource';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LogIn from './pages/login';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resource />} />
          <Route path="/login" element={<LogIn />} /> {/* Changed to lowercase */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
