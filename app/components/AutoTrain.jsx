import React, { useState, useEffect } from 'react';
import { Card, BlockStack, Checkbox, Button, Banner, Spinner } from '@shopify/polaris';
import {ChevronRightIcon,ChevronLeftIcon,TransactionIcon} from '@shopify/polaris-icons';

const AutoTrain = ({ storeData,  checkTrainingStatus,setView,handleTrain,isTraining }) => {
  const defaultResources = [
    'Customers',
    'Discounts',
    'Events',
    'Gift Cards',
    // 'Inventory',
    'Blogs',
    'Pages',
    'Orders',
    'Products',
    'Dispute',
    // 'Country Tax Rates',
    'Store Properties',
  ];

  const [selectedResources, setSelectedResources] = useState(storeData?.resources || defaultResources);
  const [error, setError] = useState(null);

  const handleResourceChange = (resource, checked) => {
    if (checked) {
      setSelectedResources((prev) => [...prev, resource]);
    } else {
      setSelectedResources((prev) => prev.filter((r) => r !== resource));
    }
  };

 

  return (
    <Card sectioned>
      {error && <Banner status="critical">{error}</Banner>}

      <p style={{marginBottom:'6px' }} >
        The AI will automatically train using the following resources from your store. You can select or deselect the resources
        as needed.
      </p>

      <BlockStack vertical spacing="tight">
        {defaultResources.map((resource) => (
          <Checkbox
            key={resource}
            label={resource}
            checked={selectedResources.includes(resource)}
            onChange={(checked) => handleResourceChange(resource, checked)}
          />
        ))}
      </BlockStack>

      <div style={{ marginTop: '20px' }}>
          <Button size='large' icon={ChevronLeftIcon} style={{marginRight:'10px'}}
           primary onClick={()=>setView(2)} 
          >
            Back 
            </Button>
        <Button variant="primary" size='large' icon={TransactionIcon} primary 
         onClick={e=>handleTrain(selectedResources)} disabled={isTraining}>
    Train 
        </Button>




      </div>

      
    </Card>
  );
};

export default AutoTrain;
