import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
// import ReportsScreen from './screens/ReportsScreen';

import './App.css';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import WaitingScreen from './screens/WaitingScreen';
import AdminScreen from './screens/AdminScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import UserReportsScreen from './screens/UserReportsScreen';
import ActivationScreen from './screens/ActivationScreen';
import UpdatePasswordScreen from './screens/UpdatePasswordScreen';
import axios from 'axios';
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignupScreen/>}> </Route>
         <Route path="/signup" element={<SignupScreen/>}> </Route>
         <Route path="/login" element={<LoginScreen/>}> </Route>
         <Route  path='/forgotPassword' element={<ForgetPasswordScreen/>}> </Route>
         <Route  path='/resetPassword/:token' element={<ResetPasswordScreen/>}> </Route>
         <Route path='/HomeScreen/:id/:token' element={<HomeScreen />}></Route>
         <Route path='/waiting/:id/:token' element={<WaitingScreen />}></Route>
         <Route path='/:userType/:id/:token' element={<AdminScreen />}></Route>
         <Route path='/profile/:adminId/:token/:userId' element={<UserProfileScreen />}></Route>
          <Route path='/reports/:financialId/:token/:userId/' element={<UserReportsScreen />}></Route>
          <Route path='/activate/:token/:id' element={<ActivationScreen/>}></Route>
          <Route  path='/updateProfile' element={<UpdatePasswordScreen/>}> </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
