import { useLocation } from 'react-router-dom';

function DisplayPhoto() {
  const location = useLocation();
  const { photo } = location.state || {};

  return (
    <div>
      <h1>Captured Photo</h1>
      {photo ? (
        <img src={photo} alt="Captured" style={{ width: '100%', maxHeight: '300px' }} />
      ) : (
        <p>No photo captured</p>
      )}
    </div>
  );
}

export default DisplayPhoto;