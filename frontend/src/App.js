import AllRoutes from "./Routes/AllRoutes";
import "./App.css";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import axios from "axios";

function App() {
  if (window.location.reload) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }
  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
