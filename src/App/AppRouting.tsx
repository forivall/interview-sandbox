import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppContent from './AppContent';

const AppRouting: React.VFC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppContent />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouting;
