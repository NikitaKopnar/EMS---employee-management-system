import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import  LoginLanding from './pages/LoginLanding';
import Dashboard from './pages/Dashboard';
import Attendence from './pages/Attendence';
import Employee from './pages/Employee';
import Layout from './pages/Layout';
import Leave from './pages/Leave';
import Payslips from './pages/Payslips';
import PrintPayslips from './pages/PrintPayslips';
import Settings from './pages/Settings';
import LoginForms from './components/LoginForms';
export const App = () => {
  return (
    <>
    <Toaster></Toaster>
    <Routes>
      <Route path='/login' element={ <LoginLanding /> } />
      <Route path='/login/admin' element={ <LoginForms role="admin" title="Admin Portal" subtitle="Sign in to manage the organization"/> } />
      <Route path='/login/employee' element={ <LoginForms role="employee" title="Employee Portal" subtitle="Sign in to access your account"/> } />
      <Route element={ <Layout /> }>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path='/Attendence' element={<Attendence/>} />
        <Route path='/Employee' element={<Employee/>} />
        <Route path='/Leave' element={<Leave/>}/>
        <Route path='/Payslips' element={<Payslips />}/>
        <Route path='/Settings' element={<Settings/>}/>
      </Route>
      <Route path='/print/payslips/:id' element={<PrintPayslips />}/>
      <Route path='*' element={<Navigate to="/dashboard" replace />}/>
    </Routes>
    </>
  )
}
export default App;
