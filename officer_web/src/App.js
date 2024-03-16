import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './component/footer';
import Header from './component/header';
import ClearancePage from './screen/clearencepage'; // Corrected import
import Home from './screen/home';
import LostPhone from './screen/lostphone';
import ComplainPage from './screen/onlinecomplain';
import SignUp from './screen/signup';
import SignIn from './screen/signin';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes> {/* Corrected to use Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/clearancepage" element={<ClearancePage />} /> {/* Corrected path */}
          <Route path="/onlinecomplain" element={<ComplainPage />} />
          <Route path="/lostphone" element={<LostPhone />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
