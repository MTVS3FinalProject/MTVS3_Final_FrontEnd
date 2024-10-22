import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Camera from './pages/camera/Camera';
import DisplayPhoto from './pages/camera/DisplayPhoto';
import VerificationPage from './pages/camera/VerificationPage';
import VerificationPhoto from './pages/camera/VerificationPhoto';

function App() {
  return (
    <Routes>
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