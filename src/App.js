import React, { useState } from "react";
import Game from "./components/Game";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return <>{isLoggedIn ? <Game /> : <Login onLogin={handleLogin} />}</>;
};

export default App;
