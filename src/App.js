import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';

// Components
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import AddProject from './components/pages/AddProject';

function App() {
  return (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/Add-Project" element={<AddProject />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;