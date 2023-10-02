import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';

// Components
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Search from './components/pages/Search';

function App() {
  return (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Search" element={<Search />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;