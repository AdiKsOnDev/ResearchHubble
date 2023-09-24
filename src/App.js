import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';

// Components
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
  <Router>
    <div>
      <Routes>
        <Route exact path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;