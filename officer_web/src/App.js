import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './component/footer';
import Header from './component/header';
import ClearancePage from './screen/clearencepage'; // Corrected import
import Forgot from './screen/fogot_password/fogot';
import Home from './screen/home';
import LostPhone from './screen/lostphone';
import NewHome from './screen/newHome/newHome';
import ComplainPage from './screen/onlinecomplain';
import SignIn from './screen/signin';
import SignUp from './screen/signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes> {/* Corrected to use Routes */}
          <Route path="/criminallist" element={<Home />} />
          <Route path="/newhome" element={<NewHome />} /> {/*new home page */}
          <Route path="/clearancepage" element={<ClearancePage />} /> {/* Corrected path */}
          <Route path="/onlinecomplain" element={<ComplainPage />} />
          <Route path="/lostphone" element={<LostPhone />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/fogot" element={<Forgot/>} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
