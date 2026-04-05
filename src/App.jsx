import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import TapOut from "./pages/TapOut"; 

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TapOut />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  )
}

export default App;
