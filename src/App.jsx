import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useEffect } from 'react';
import Login from './pages/Login';
import SignUpGuide from './pages/camera/signup/SignUpGuide';
import Camera from './pages/camera/signup/Camera';
import DisplayPhoto from './pages/camera/signup/DisplayPhoto';
import SignUpComplete from './pages/camera/signup/SignUpComplete';
import VerificationGuide from './pages/camera/verification/VerificationGuide';
import VerificationPage from './pages/camera/verification/VerificationPage';
import VerificationPhoto from './pages/camera/verification/VerificationPhoto';
import VerificationComplete from './pages/camera/verification/VerificationComplete';

import TicketConcertListPage from './pages/ticket/TicketConcertListPage';

import QRCodeReader from './pages/admin/AdminQRVerification';
import TicketInfoPage from './pages/admin/TicketInfoPage';

import TicketVerificationGuide from './pages/camera/ticket/TicketVerificationGuide';
import TicketVerificationCamera from './pages/camera/ticket/TicketVerificationCamera';
import TicketVerificationPhoto from './pages/camera/ticket/TicketVerificationPhoto';
import AdminMemberVerificationCamera from './pages/admin/AdminMemberVerificationCamera';
import AdminMemberVerificationPhoto from './pages/admin/AdminMemberVerificationPhoto';

import PropTypes from 'prop-types';

// 보호된 라우트를 위한 컴포넌트
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (!token) {
      localStorage.clear();
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup/guide' element={<SignUpGuide />} />
      <Route path='/verification/guide' element={<VerificationGuide />} />
      <Route path='/signup/camera' element={<Camera />} />
      <Route path='/verification/camera' element={<VerificationPage />} />
      <Route path='/signup/photo' element={<DisplayPhoto />} />
      <Route path='/verification/photo' element={<VerificationPhoto />} />
      <Route path='/signup/complete' element={<SignUpComplete />} />
      <Route path='/verification/complete' element={<VerificationComplete />} />
      
      {/* 보호된 라우트들 */}
      <Route path='/member/tickets' element={
        <PrivateRoute>
          <TicketConcertListPage />
        </PrivateRoute>
      } />
      <Route path='/admin/qr' element={
        <PrivateRoute>
          <QRCodeReader />
        </PrivateRoute>
      } />
      <Route path='/admin/ticket/info' element={
        <PrivateRoute>
          <TicketInfoPage />
        </PrivateRoute>
      } />
      <Route path='/member/tickets/verification/guide' element={
        <PrivateRoute>
          <TicketVerificationGuide />
        </PrivateRoute>
      } />
      <Route path='/member/tickets/verification/camera' element={
        <PrivateRoute>
          <TicketVerificationCamera />
        </PrivateRoute>
      } />
      <Route path='/member/tickets/verification/photo' element={
        <PrivateRoute>
          <TicketVerificationPhoto />
        </PrivateRoute>
      } />
      <Route path='/admin/member/verification/camera' element={
        <PrivateRoute>
          <AdminMemberVerificationCamera />
        </PrivateRoute>
      } />
      <Route path='/admin/member/verification/photo' element={
        <PrivateRoute>
          <AdminMemberVerificationPhoto />
        </PrivateRoute>
      } />
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