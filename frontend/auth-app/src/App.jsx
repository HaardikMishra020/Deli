// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
import NotFound from './components/NotFound';
import NewPassword from './components/NewPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/new-password/" element={<NewPassword/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
};

export default App;
