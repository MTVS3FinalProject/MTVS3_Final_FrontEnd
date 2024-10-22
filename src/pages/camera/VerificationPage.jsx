import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CaptureVerificationPhoto from './CaptureVerificationPhoto.jsx';

function VerificationPage() {
  const location = useLocation();
  const [memberId, setMemberId] = useState('');

  useEffect(() => {
    // QR 코드에서 memberId 정보를 쿼리 파라미터로 가져옴
    const queryParams = new URLSearchParams(location.search);
    const memberIdFromQR = queryParams.get('id');
    
    if (memberIdFromQR) {
      setMemberId(memberIdFromQR);
    }
  }, [location]);

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1>Member Verification Page</h1>
      </header>
      
      <main style={styles.mainContent}>
        {/* 카메라 컴포넌트에 memberId 정보를 전달 */}
        <CaptureVerificationPhoto memberId={memberId} />
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '20px',
    width: '100%',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  footer: {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '10px',
    width: '100%',
  },
};

export default VerificationPage;
