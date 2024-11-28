import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import { verifyTicket } from '../../api/admin/ticket';
import HeaderBar from '../../components/Header';
import styled from 'styled-components';

const QRCodeReader = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const lastScanned = useRef(null);
    const navigate = useNavigate();
    const [scanDelay, setScanDelay] = useState(1000);

    const handleScan = async (result) => {
        if (result?.text && result.text !== lastScanned.current) {
            lastScanned.current = result.text;
            setData(result.text);
            setError(null);

            const url = new URL(result.text);
            const ticketId = url.searchParams.get('ticketId');

            if (!ticketId) {
                console.error('Invalid QR code format: ticketId missing');
                setError('Invalid QR code format. Please try again.');
                return;
            }

            try {
                const response = await verifyTicket(ticketId);
                console.log(response);
                navigate('/admin/ticket/info', { state: response });
            } catch (err) {
                console.error('Error communicating with the server:', err);
                setError('Failed to validate ticket. Please try again.');
            }
        }
    };

    const handleError = (err) => {
        console.error('QR Reader Error:', err);
        if (!data) {
            setError('QR code scanning failed. Please try again.');
        }
    };

    const handleManualRequest = async () => {
        const ticketId = '2';
        try {
            const response = await verifyTicket(ticketId);
            console.log(response);
            navigate('/admin/ticket/info', { state: response });
        } catch (err) {
            console.error('Error communicating with the server:', err);
            setError('Failed to validate ticket. Please try again.');
        }
    };

    return (
        <>
            <HeaderBar />
            <Container>
                <QrReader
                    onResult={(result, error) => {
                        if (result) {
                            handleScan(result);
                        } else if (error) {
                            handleError(error);
                        }
                    }}
                    constraints={{ facingMode: { ideal: 'environment' } }}
                    scanDelay={scanDelay}
                    videoStyle={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                    }}
                    containerStyle={{
                        position: 'relative',
                        width: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginTop: '12rem',
                    }}
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
                <ManualButton onClick={handleManualRequest}>
                    Validate with Ticket ID 2
                </ManualButton>
            </Container>
        </>
    );
};

export default QRCodeReader;

const Container = styled.div`
    padding: 20px;
    background-color: #0d1117;
    height: 100vh;
    display: flex;
    flex-direction: column;
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

const ManualButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
