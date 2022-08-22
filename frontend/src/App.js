import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
// import ReportsScreen from './screens/ReportsScreen';

import './App.css';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <>
    <Router>
      <Routes>
         <Route path="/signup" element={<SignupScreen/>}> </Route>
         <Route path="/login" element={<LoginScreen/>}> </Route>
         <Route  path='/forgotPassword' element={<ForgetPasswordScreen/>}> </Route>
         <Route  path='/resetPassword/:token' element={<ResetPasswordScreen/>}> </Route>
         <Route path='/HomeScreen/:id/:token' element={<HomeScreen />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
