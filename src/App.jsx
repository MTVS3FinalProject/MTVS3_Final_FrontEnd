import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Login from './pages/Login';
import SignUpGuide from './pages/camera/signup/SignUpGuide';
import Camera from './pages/camera/signup/Camera';
import DisplayPhoto from './pages/camera/signup/DisplayPhoto';
import VerificationPage from './pages/camera/verification/VerificationPage';
import VerificationPhoto from './pages/camera/verification/VerificationPhoto';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup/guide' element={<SignUpGuide />} />
      <Route path='/signup/camera' element={<Camera />} />
      <Route path='/verification/camera' element={<VerificationPage />} />
      <Route path='/signup/photo' element={<DisplayPhoto />} />
      <Route path='/verification/photo' element={<VerificationPhoto />} />
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