import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLoginScreen from './screens/UserLoginScreen';
import UserSignupScreen from './screens/UserSignupScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import Public from './utils/Public';
import Protect from './utils/Protect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Router>
      <Routes>

        <Route element={<Public />}>
          <Route path='/' element={<UserLoginScreen />} />
          <Route path='/signup' element={<UserSignupScreen />} />
        </Route>

        <Route element={<Protect />}>
          <Route path='/chat' element={<UserHomeScreen />} />
        </Route>

      </Routes>
      <ToastContainer />
    </Router>
    </>
  );
}

export default App;
