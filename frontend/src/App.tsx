import React from 'react';

import GlobalStyle from './globalStyles';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <GlobalStyle />
      <NavBar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/care-report/:care_recipient_name" element={<>hi tim</>} />
      </Routes>
    </>
  );
}

export default App;
