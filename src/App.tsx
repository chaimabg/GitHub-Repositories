import React from 'react';
import './App.css';
import ProfileComponent from "./components/profile/profile.component";
import NavbarComponent from "./components/layouts/navbar.component";
function App() {
  return (
      <div>
          <NavbarComponent/>
       <ProfileComponent/>
      </div>

  );
}

export default App;
