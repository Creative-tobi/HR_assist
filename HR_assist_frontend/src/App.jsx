import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";

// We create a quick wrapper component to give your Landing page access to the router
const LandingWrapper = () => {
  const navigate = useNavigate();

  // When the "Start Analyzing" button is clicked, it routes them to the /app URL
  return <Landing onGetStarted={() => navigate("/app")} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* The storefront: When users visit your base URL, they see the Landing page */}
        <Route path="/" element={<LandingWrapper />} />

        {/* The engine: When they click get started, they are routed to the main tool */}
        <Route path="/app" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
