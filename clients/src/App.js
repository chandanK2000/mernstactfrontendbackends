import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Edit from './pages/Edit/Edit';
import Profile from './pages/Profile/Profile';
import Headers from './components/Headers/Headers';
import { Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import UserRegister from './pages/userRegister/UserRegister';
import ForgotPasswordForm from './pages/ForgotPasswordForm ';
import AuthProvider from './components/context/AuthProvider';
import NetworkIndicatorStatus from './NetworkIndicatorStatus';
import { useEffect, useState } from 'react';
function App() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="offline-message">
        <img src="./offline.jpg" alt="Offline"  height="100px" width="200px"/>
        <h2>No internet</h2>
        <p>Try:</p>
        <ul>
          <li>Checking the network cables, modem, and router</li>
          <li>Reconnecting to Wi-Fi</li>
          <li>Running Windows Network Diagnostics</li>
        </ul>
      </div>
    );
  }


  return (

    <>
      <AuthProvider>
      <Headers/>
        <NetworkIndicatorStatus />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/userprofile/:id" element={<Profile />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/ForgotPasswordForm" element={<ForgotPasswordForm />} />
        {/* <Route path="/LoginForm" element={<LoginForm />} /> */}
        {/* <Route path="/Profiles" element={<Profiles />} /> */}

      </Routes>
      {/* <ToastContainer /> */}
      </AuthProvider>
    </>
  );
}

export default App;
