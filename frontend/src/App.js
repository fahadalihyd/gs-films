import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Blog from './pages/Blog';
import {Routes , Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <div className="App">
      <h1>Welcome to react js App</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="blog/:id" element={<Blog />} />
      </Routes>  
    </div>
  );
}

export default App;
