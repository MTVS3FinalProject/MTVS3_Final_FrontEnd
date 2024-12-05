import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
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
      <Route path='/member/tickets' element={<TicketConcertListPage />} />
      <Route path='/admin/qr' element={<QRCodeReader />} />
      <Route path='/admin/ticket/info' element={<TicketInfoPage />} />
      <Route path='/member/tickets/verification/guide' element={<TicketVerificationGuide />} />
      <Route path='/member/tickets/verification/camera' element={<TicketVerificationCamera />} />
      <Route path='/member/tickets/verification/photo' element={<TicketVerificationPhoto />} />
      <Route path='/admin/member/verification/camera' element={<AdminMemberVerificationCamera />} />
      <Route path='/admin/member/verification/photo' element={<AdminMemberVerificationPhoto />} />
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