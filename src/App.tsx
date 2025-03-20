import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/auth";
import { Dashboard } from "./pages/dashboard/index.tsx";
import { FinancialRecordProvider } from "./contexts/financial-record-context";
import Navbar from "./components/Navbar.tsx";
import { Box } from "@mui/material";
function App() {
  return (
    <Box sx={{}}>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordProvider>
                <Dashboard />
              </FinancialRecordProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
