import React from 'react';
import SwitchRoute from './SwitchRoute';
import UserContext from './UserContext';
import './App.css';

function App() {
  return (
    <UserContext>
      <SwitchRoute/>
    </UserContext>
  );
}

export default App;
