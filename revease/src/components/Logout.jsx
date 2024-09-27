import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import '../assets/styles/components/Logout.css';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <button onClick={handleLogout} className="btn btn-logout btn-wide">
      Logout
    </button>
  );
};

export default LogoutButton;
