import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage.jsx';

import Login from './Pages/Login.jsx';
import SignIn from './Pages/SignIn.jsx';
import toast, { Toaster } from 'react-hot-toast';
import NewHomePage from './Pages/NewHomePage.jsx';



function App() {
  return (
   <>
   <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<NewHomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signin" element={<SignIn/>} />
      
    </Routes>
    </>
  );
}

export default App;
