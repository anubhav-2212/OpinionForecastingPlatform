import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage.jsx';

import Login from './Pages/Login.jsx';
import SignIn from './Pages/SignIn.jsx';
import toast, { Toaster } from 'react-hot-toast';
import NewHomePage from './Pages/NewHomePage.jsx';
import { useAuth } from './context/AuthContext.jsx';


function App() {
  
    const { isAuth, loading } = useAuth();
    console.log(isAuth,loading);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
   <>
   <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path="/" element={isAuth ? <NewHomePage/> :<LandingPage/>} />
      <Route path="/home" element={ isAuth ? <NewHomePage/> :<Login/>} />
      <Route path="/login" element={ isAuth? <Navigate to='/home'/> :<Login/>} />
      <Route path="/signin" element={ isAuth ? <Navigate to='/home'/> :<SignIn/>} />
      
    </Routes>
    </>
  );
}

export default App;
