import React, { useState, useEffect,useCallback, useRef } from 'react';
import { Frame, Navigation, AppProvider, Page, Card, Button, Spinner, TextContainer,
Banner } from '@shopify/polaris';

import '@shopify/polaris/build/esm/styles.css';
import Header from '../components/Header';
import MainView from '../views/MainView';
import ThemeView from '../views/ThemeView';
import TrainView from '../views/TrainView';
import ConnectView from '../views/ConnectView';
import { fetchThemes, onSubmit, onThemeSelect, onTrain, checkTrainingStatus, onConnect, fetchTrainingData } from '../api';
import {
  ArrowLeftIcon,
  HomeIcon,
  OrderIcon,
  ChatIcon,
} from '@shopify/polaris-icons';
import "../styles.css"

import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";

// import { authenticate } from "../shopify.server";
 
 


const App = () => {
  const [view, setView] = useState(1); // 1: Main, 2: Theme, 3: Train, 4: Connect
  const [storeData, setStoreData] = useState({});
  const [trainingStatus, setTrainingStatus] = useState({ success: false, complete: false });
  const [isLoading, setIsLoading] = useState(false);

 // console.log('discount', discount.data.codeDiscountNodes.pageInfo)
 // console.log('shit',responseJson.data.customers.edges)

  
  // Handle API submission
  const handleSubmit = async (data) => {
      setStoreData((prevData) => ({ ...prevData, ...data }));
      setView(2);
    // setIsLoading(true);
    // // const result = await onSubmit(data);
    // setIsLoading(false);
    // if (result.success) {
    // } else {
    //   alert(result.message);
    // }
  };

  // Handle theme selection
  const handleThemeSelect = async (theme) => {
      setStoreData((prevData) => ({ ...prevData, theme:theme.name }));
      setView(3);
    // setIsLoading(true);
    // const result = await onThemeSelect(theme);
    // setIsLoading(false);
    // if (result.success) {
    // } else {
    //   alert(result.message);
    // }
  };

  

  // Handle connection
  const handleConnect = async () => {
    setIsLoading(true);
    const result = await onConnect();
    setIsLoading(false);
    if (result.success) {
      window.location.href = '/'; // Redirect to store main page or another URL
    } else {
      alert(result.message);
    }
  };



  // useEffect(() => {
  //   // Load initial data on component mount
  //   const loadInitialData = async () => {
  //     try {
  //       const initialData = await fetchInitialData();
  //       setStoreData(initialData);
  //     } catch (error) {
  //       console.error('Error fetching initial data:', error);
  //     }
  //   };

  //   loadInitialData();
  // }, []);

   const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    [],
  );

  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    [],
  );

  return (
    <AppProvider>
      <Frame
        // topBar={<Header />}
        navigation={<Navigation location="/">

        <Navigation.Section
        items={[
          {
            label: 'Back to Shopify',
            icon: ArrowLeftIcon,
          },
        ]}
      />
      <Navigation.Section
        separator
        title="AI Customer Support"
        items={[
          {
            label: 'Contact Support',
            icon: ChatIcon,
            onClick: toggleModalActive,
          },
        
        ]}
        action={{
          icon: ChatIcon,
          accessibilityLabel: 'Contact support',
          onClick: toggleModalActive,
        }}
      />

        </Navigation>}
      >
        <Page title="Configurations Setup" 

          secondaryActions={[
        {content: 'New'},
        {content: 'View on your store'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}

      >

 <Banner
      title={ view === 1? "Chatbots Details":view === 2?"Select Theme":view === 3? "Train Data":"Connect to Store"}
        tone="info"

      onDismiss={() => {}}
    />

<hr style={{border: "0px solid #e3e3e3"}} />


          {isLoading && (
            <Card sectioned>
              <TextContainer>
                <Spinner size="large" />
                <p>Loading...</p>
              </TextContainer>
            </Card>
          )}

          {!isLoading && view === 1 && (
            <MainView
              storeData={storeData}
              onSubmit={handleSubmit}
            />
          )}

          {!isLoading && view === 2 && (
            <ThemeView setView={setView}
              storeData={storeData}
              fetchThemes={fetchThemes}
              onThemeSelect={handleThemeSelect}
            />
          )}

          {!isLoading && view === 3 && (
            <TrainView setView={setView}
              storeData={storeData}
              fetchTrainingData={fetchTrainingData}
           checkTrainingStatus={checkTrainingStatus}
            />
          )}

          {!isLoading && view === 4 && (
            <ConnectView setView={setView} 
              onConnect={handleConnect}
            />
          )}
        </Page>
      </Frame>
    </AppProvider>
  );
};

export default App;
