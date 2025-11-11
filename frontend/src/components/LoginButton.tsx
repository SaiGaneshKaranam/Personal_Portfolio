import React from "react";

const CLIENT_ID = "9892f738-58c7-4455-b8f3-70f44204e51f"; // Replace with your real key
const REDIRECT_URI = "http://localhost:5000/auth/callback";

const LoginButton: React.FC = () => {
  const handleLogin = () => {
    const upstoxLoginUrl = `https://api-v2.upstox.com/login/authorization/dialog?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = upstoxLoginUrl;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Welcome to Your Upstox Portfolio App</h2>
      <button
        style={{
          backgroundColor: "#673ab7",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={handleLogin}
      >
        🔐 Login with Upstox
      </button>
    </div>
  );
};

export default LoginButton;
