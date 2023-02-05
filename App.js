import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Navigation from './src/Navigation';
const App = () => {
  return (
    <AuthProvider>
      <Navigation></Navigation>
    </AuthProvider>
  );
};

export default App;
