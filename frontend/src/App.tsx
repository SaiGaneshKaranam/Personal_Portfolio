import React, { useEffect, useState } from "react";
import HoldingsTable from "./components/HoldingsTable";
import LoginButton from "./components/LoginButton";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
  // Check URL for token
  const params = new URLSearchParams(window.location.search);
  const urlToken = params.get("token");

  if (urlToken) {
    localStorage.setItem("upstox_token", urlToken);
    setToken(urlToken);
    window.history.replaceState({}, "", "/"); // Clean URL
  } else {
    const storedToken = localStorage.getItem("upstox_token");
    if (storedToken) setToken(storedToken);
  }
}, []);

  return <div>{token ? <HoldingsTable /> : <LoginButton />}</div>;
};

export default App;
