import React from "react";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div style={styles.container}>
      <Dashboard />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
};

export default App;
