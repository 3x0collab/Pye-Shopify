import React, { useState } from 'react';
import { Card, TextField, Button, Banner, Spinner, BlockStack } from '@shopify/polaris';
import {ChevronRightIcon,ChevronLeftIcon,TransactionIcon} from '@shopify/polaris-icons';

const ManualTrain = ({ onTrain, checkTrainingStatus,storeData, setView }) => {
  const [inputData, setInputData] = useState('');
  const [error, setError] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [isTrainingComplete, setIsTrainingComplete] = useState(false);

  const handleInputChange = (value) => setInputData(value);

  const handleTrain = async () => {
    if (!inputData) {
      setError('Input data is required');
      return;
    }

    try {
      setError(null);
      setIsTraining(true);

      const result = await onTrain(inputData);
      if (!result.success) {
        throw new Error(result.message);
      }

      const pollTrainingStatus = setInterval(async () => {
        const status = await checkTrainingStatus();
        if (status.finished) {
          setIsTraining(false);
          setIsTrainingComplete(true);
          clearInterval(pollTrainingStatus);
        }
      }, 5000);
    } catch (err) {
      setError(err.message);
      setIsTraining(false);
    }
  };

  return (
    <Card sectioned>
      {error && <Banner status="critical">{error}</Banner>}

      <TextField
        label="Manual Input Data"
        value={inputData}
        onChange={handleInputChange}
        placeholder="Enter data to train the AI manually"
        multiline={21}
        autoComplete="off"
      />

      <div style={{ marginTop: '20px' }}>
             <Button  icon={ChevronLeftIcon} style={{marginRight:'10px'}} primary onClick={()=>setView(2)} 
          >
            Back 
            </Button>
        <Button  variant="primary" primary icon={TransactionIcon} size='large' onClick={handleTrain} disabled={isTraining}>
          {isTraining ? <Spinner size="small" /> : 'Train'}
        </Button>

   




      </div>

      {isTraining && !isTrainingComplete && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Spinner size="large" />
          <p>Training is in progress. Please wait...</p>
        </div>
      )}

      {isTrainingComplete && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Training completed successfully!</p>
        </div>
      )}
    </Card>
  );
};

export default ManualTrain;
