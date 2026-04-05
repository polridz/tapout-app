import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TapOut from "./pages/TapOut"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TapOut />} />
      </Routes>
    </Router>
  )
}

export default App;
