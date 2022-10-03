import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import {Routes , Route, useNavigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { IS_LOGIN } from './helper/config';
import FilmForm from './pages/Film/FilmForm';
function App() {
  const navigate = useNavigate();
  const logoutHandel = () => {
    localStorage.removeItem('user');
    window.location.reload();
    navigate("/login");
  }

  return (
    <div className="App">
      <h1>Welcome to react js App</h1>
      {
        IS_LOGIN && (
          <div className='row'>
            <div className='col-12'>
              <button className='btn btn-sm btn-success' onClick={logoutHandel}>Logout</button>
            </div>
          </div>
        )
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/film/create" element={<FilmForm />} />
      </Routes>  
    </div>
  );
}

export default App;
