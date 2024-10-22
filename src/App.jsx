import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Login from './pages/Login';
import Camera from './pages/camera/signup/Camera';
import DisplayPhoto from './pages/camera/signup/DisplayPhoto';
import VerificationPage from './pages/camera/verification/VerificationPage';
import VerificationPhoto from './pages/camera/verification/VerificationPhoto';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/camera/signup' element={<Camera />} />
      <Route path='/camera/verification' element={<VerificationPage />} />
      <Route path='/photo/signup' element={<DisplayPhoto />} />
      <Route path='/photo/verification' element={<VerificationPhoto />} />
    </Routes>
  )
}

export default function MainApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}