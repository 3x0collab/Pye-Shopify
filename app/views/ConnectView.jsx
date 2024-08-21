import React, { useState } from 'react';
import { Card, Button, Banner, Spinner, TextContainer } from '@shopify/polaris';
import {ChevronRightIcon,ChevronLeftIcon,ConnectIcon } from '@shopify/polaris-icons';

const ConnectView = ({ onConnect,setView }) => {
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
          <TextContainer>
            <p>Congratulations! You're ready to connect your AI to the store.</p>
            <p>Click the button below to integrate the AI into your store.</p>
          </TextContainer>
         <br />
      <div style={{ display:'flex',justifyContent:'center' }}>

          <Button variant="primary" icon={ConnectIcon} primary size='large' onClick={handleConnect} disabled={isConnecting}>
            {isConnecting ? <Spinner size="small" /> : 'Connect AI'}
          </Button>

            <Button icon={ChevronLeftIcon} style={{marginRight:'10px'}} primary onClick={()=>setView(3)} 
          >
            Back 
            </Button>

        </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <TextContainer>
            <p>Your AI has been successfully connected to the store!</p>
            <p>Refresh your store to see the changes.</p>
          </TextContainer>
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

export default ConnectView;
