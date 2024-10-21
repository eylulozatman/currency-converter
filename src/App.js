
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './homepage';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        {/* Proje açıldığında HomePage bileşeni yüklenecek */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
