import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './components/Home';
import Works from './components/Works';
import Singlework from './components/Singlework';






function App() {

  return (

    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/singlework/:id" element={<Singlework />} />
      </Routes>
    </Router>
  );
}

export default App
