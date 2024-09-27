import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import '../assets/styles/components/Login.css';

const Login = () => {
  const { login, error } = useContext(AuthContext); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password); 
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center login-horizontal">
      <div className="form-group mb-0 me-2">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group mb-0 me-2">
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-wide">Login</button>
      {error && <p className="text-danger text-center mb-0 ms-2">{error}</p>}
    </form>
  );
};

export default Login;