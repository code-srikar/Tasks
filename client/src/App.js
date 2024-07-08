import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Tasks from './components/Tasks/Tasks';
import AuthProvider from './components/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
