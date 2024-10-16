import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CapturePhoto from './CapturePhoto';

function Camera() {
  const location = useLocation();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // QR 코드에서 이메일 정보를 쿼리 파라미터로 가져옴
    const queryParams = new URLSearchParams(location.search);
    const emailFromQR = queryParams.get('email');
    
    if (emailFromQR) {
      setEmail(emailFromQR);
    }
  }, [location]);

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1>Photo Upload Page</h1>
      </header>
      
      <main style={styles.mainContent}>
        {/* 카메라 컴포넌트에 이메일 정보를 전달 */}
        <CapturePhoto email={email} />
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

export default Camera;
