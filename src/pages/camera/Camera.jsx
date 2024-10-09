import CameraUpload from "../../api/camera";

function CameraPage() {
  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1>Photo Upload Page</h1>
      </header>
      
      <main style={styles.mainContent}>
        {/* 카메라 업로드 컴포넌트를 렌더링 */}
        <CameraUpload />
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

export default CameraPage;