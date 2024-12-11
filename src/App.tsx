// src/App.tsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import Dashboard from './Dashboard'; // Assuming this is the main component

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
};

export default App;
