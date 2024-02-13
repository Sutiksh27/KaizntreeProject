import { useState } from 'react'
import LoginContainer from './containers/LoginContainer'
import DashboardContainer from './containers/DashboardContainer.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword.tsx';
import SignupContainer from './containers/SignupContainer.tsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" Component={LoginContainer} />
          <Route path="/signup" Component={SignupContainer} />
          <Route path="/dashboard" Component={DashboardContainer} />
          <Route path="/forgot-password" Component={ForgotPassword} />
        </Routes>
      </Router>
    </>
  )
}

export default App
