import { useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import { verifyTicket } from '../../api/admin/ticket';
import HeaderBar from '../../components/Header';
import styled from 'styled-components';

const QRCodeReader = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const lastScanned = useRef(null); // To track the last scanned QR code

    const handleScan = async (result) => {
        if (result?.text && result.text !== lastScanned.current) {
        lastScanned.current = result.text; // Update the last scanned value
        setData(result.text);
        setError(null); // Clear previous errors

        const url = new URL(result.text);
        const ticketId = url.searchParams.get('ticketId');

        if (!ticketId) {
            console.error('Invalid QR code format: ticketId missing');
            setError('Invalid QR code format. Please try again.');
            return;
        }

        try {
            const response = await verifyTicket(ticketId);
            console.log('Verification Response:', response.data);
        } catch (err) {
            console.error('Error communicating with the server:', err);
            setError('Failed Validate. Please try again.');
        }
        }
    };

    const handleError = (err) => {
        console.error('QR Reader Error:', err);
        if (!data) { // Only show the error if no successful scan has occurred
        }
    };

    return (
        <>
            <HeaderBar/>
            <Container>
                <QrReader
                    onResult={(result, error) => {
                        if (result) {
                            handleScan(result);
                        } else if (error) {
                            handleError(error);
                        }
                    }}
                    constraints={{ facingMode: { ideal: 'environment' } }} // Adjust facingMode for better camera selection
                    videoStyle={{ 
                        position: 'absolute', 
                        inset: 0, 
                        width: '100%', 
                        height: '100%' 
                    }} // Make video feed responsive and fill container
                    containerStyle={{ 
                        position: 'relative', 
                        width: '100%', 
                        border: '1px solid #ccc', 
                        borderRadius: '8px', 
                        overflow: 'hidden',
                        marginTop: '12rem',
                    }} // Enhance styling for video container
                />
                {data && (
                    <ScannedData>
                    <h3>Scanned Data:</h3>
                    <p>{data}</p>
                    </ScannedData>
                )}
                {error && (
                    <ErrorMessage>
                        <p>{error}</p>
                    </ErrorMessage>
                )}
            </Container>
        </>
    );
};

export default QRCodeReader;

const Container = styled.div`
    padding: 20px;
    background-color: #0d1117;
    height: 100vh;
    align-items: center;
    justify-content: center;
`;

const ScannedData = styled.div`
    margin-top: 20px;
`;

const ErrorMessage = styled.div`
    margin-top: 20px;
    color: red;
`;
