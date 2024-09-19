import React from "react";
import { login } from "../services/auth";

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await login(username, password);
            console.log("Logged in:", data);
            localStorage.setItem("token", data.token);
            setError(null);
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Error logging in. Check your credentials.");
        }
    };

    return (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      );
    };
    
    export default Login;