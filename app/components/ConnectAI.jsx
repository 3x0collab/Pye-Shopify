import React, { useState } from 'react';
import { Card, Button, Banner, Spinner } from '@shopify/polaris';

const ConnectAI = ({ onConnect }) => {
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    try {
      setError(null);
      setIsConnecting(true);

      const result = await onConnect();
      if (!result.success) {
        throw new Error(result.message);
      }

      setIsConnected(true);
    } catch (err) {
      setError(err.message);
      setIsConnecting(false);
    }
  };

  return (
    <Card sectioned>
      {error && <Banner status="critical">{error}</Banner>}

      {!isConnected ? (
        <div style={{ textAlign: 'center' }}>
          <p>Congratulations! You're ready to connect your AI to the store.</p>
          <Button primary onClick={handleConnect} disabled={isConnecting}>
            {isConnecting ? <Spinner size="small" /> : 'Connect'}
          </Button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p>Your AI has been successfully connected to the store!</p>
        </div>
      )}

      {isConnecting && !isConnected && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Spinner size="large" />
          <p>Connecting AI to your store. Please wait...</p>
        </div>
      )}
    </Card>
  );
};

export default ConnectAI;
