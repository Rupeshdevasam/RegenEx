import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import React from "react";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
