import React, { useState, useEffect } from 'react';
import { Card, Tabs, Button, Banner, Spinner, Checkbox, BlockStack } from '@shopify/polaris';
import AutoTrain  from '../components/AutoTrain'
import ManualTrain  from '../components/ManualTrain'
import DataLoader  from '../routes/DataLoader'


const TrainView = ({ storeData, fetchTrainingData, checkTrainingStatus,setView }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [trainingData, setTrainingData] = useState([]);
  const [selectedData, setSelectedData] = useState(storeData?.trainingData || []);
  const [error, setError] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);

  useEffect(() => {
    const loadTrainingData = async () => {
      try {
        const data = await fetchTrainingData();
        setTrainingData(data);
        setSelectedData(storeData?.trainingData || Object.assign([],data).map(d => d.value)); // Select all by default if no storeData
      } catch (err) {
        setError('Failed to load training data. Please try again.'+String(err));
      }
    };

    loadTrainingData();
  }, [fetchTrainingData, storeData]);

  const handleTabChange = (selectedTabIndex) => {
    setSelectedTab(selectedTabIndex);
  };

 

 const submitTrain = async (selectedData) => {

    const result = await onTrain({...storeData,train_data: selectedData,
     } );
    if (result.success) {
      // Poll for training status
      const intervalId = setInterval(async () => {
        const status = await checkTrainingStatus();
        setTrainingStatus(status);
        if (status.complete) {
    setIsTraining(false);
      setTrainingComplete(true);
          clearInterval(intervalId);
          setView(4);
        }
      }, 5000); // Poll every 5 seconds
    } else {
      setIsTraining(false);
      alert(result.message);
    }
  };




  const handleTrainData = async (selectedResources) => {
    try {
      setError(null);
      setIsTraining(true);

      setSelectedData(selectedResources) 
      localStorage.setItem('selectedResources',JSON.stringify(selectedResources))
    
    } catch (err) {
      setError(err.message);
      setIsTraining(false);
    }
  };

  const tabs = [
    { id: 'auto-train', content: 'Auto Train', panelID: 'auto-train-panel' },
    { id: 'manual-train', content: 'Manual Train', panelID: 'manual-train-panel' },
  ];




  return (
    <Card>
      {error && <Banner status="critical">{error}</Banner>}

      <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} fitted>
    
          {selectedTab === 0 ? (
           <AutoTrain  storeData={storeData}  handleTrain={handleTrainData} setView={setView}
           checkTrainingStatus={checkTrainingStatus} isTraining={isTraining} /> ) : (
          <ManualTrain storeData={storeData}   handleTrain={handleTrainData} setView={setView}
           checkTrainingStatus={checkTrainingStatus}  isTraining={isTraining}  />
          )}
    
      </Tabs>

      {isTraining && !trainingComplete && (
        <DataLoader isTraining={isTraining} isTrainingComplete={trainingComplete} submitTrain={submitTrain}  />
      )}

      {trainingComplete && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Training complete! You can now connect your AI to the store.</p>
        </div>
      )}


    </Card>
  );
};

export default TrainView;
