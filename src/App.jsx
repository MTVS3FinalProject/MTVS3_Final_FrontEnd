import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import CameraPage from './pages/camera/CameraPage';

function App() {
  return (
    <Routes>
      <Route path='/camera' element={<CameraPage />} />
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