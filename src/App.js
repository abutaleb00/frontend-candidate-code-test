import { Login } from "./Login";
import { Dashboard } from "./Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>

  );
}

export default App;