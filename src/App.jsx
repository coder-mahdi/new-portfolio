import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './components/Home';
import Works from './components/Works';
import Singlework from './components/Singlework';
import About from './components/About';






function App() {

  return (

    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/singlework/:id" element={<Singlework />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App
