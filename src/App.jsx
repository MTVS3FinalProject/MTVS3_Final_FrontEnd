import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Camera from './pages/camera/Camera';
import DisplayPhoto from './pages/camera/DisplayPhoto';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Camera />} />
      <Route path='/photo' element={<DisplayPhoto />} />
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