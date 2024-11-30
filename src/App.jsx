import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App
