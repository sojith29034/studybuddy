import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Quiz from './pages/Quizz';
import Register from './pages/Register';
import Login from './pages/Login';
import { useState, useEffect } from 'react';
import Admin from './admin/Admin';
import Student from './student/Student';
import FormStatus from './teacher/FormStatus';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    const savedStatus = localStorage.getItem('isAdminLoggedIn');
    return savedStatus === 'true'; // Convert from string to boolean
  });

  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(() => {
    const savedStatus = localStorage.getItem('isStudentLoggedIn');
    return savedStatus === 'true';
  });

  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(() => {
    const savedStatus = localStorage.getItem('isTeacherLoggedIn');
    return savedStatus === 'true';
  });

  // Save the login status to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('isAdminLoggedIn', isAdminLoggedIn.toString());
  }, [isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem('isStudentLoggedIn', isStudentLoggedIn.toString());
  }, [isStudentLoggedIn]);

  useEffect(() => {
    localStorage.setItem('isTeacherLoggedIn', isTeacherLoggedIn.toString());
  }, [isTeacherLoggedIn]);

  return (
    <div style={{ backgroundColor: '#222', minHeight: '100vh' }}>
      <Router>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/login"
            element={
              <Login
                onAdminLogin={() => setIsAdminLoggedIn(true)}
                onStudentLogin={() => setIsStudentLoggedIn(true)}
                onTeacherLogin={() => setIsTeacherLoggedIn(true)}
              />
            }
          />
          <Route
            path="/admin/*"
            element={isAdminLoggedIn ? <Admin /> : <Navigate to="/login" />}
          />
          <Route
            path="/student/*"
            element={
              isStudentLoggedIn ? <Student /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/teacher/*"
            element={
              isTeacherLoggedIn ? <FormStatus /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
